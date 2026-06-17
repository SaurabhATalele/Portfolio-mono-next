import { Hero } from "./components/Hero";
import { TechStack } from "./components/TechStack";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { getPayload } from "payload";
import config from "@payload-config";

async function getTestimonials() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'testimonials',
      where: {
        approved: {
          equals: true,
        },
      },
      sort: '-createdAt',
    });

    return result.docs.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      avatar: doc.avatar || '',
      content: doc.content,
      rating: doc.rating,
      createdAt: doc.createdAt,
      position: doc.position || '',
      organization: doc.organization || '',
    }));
  } catch (error) {
    console.error("Error fetching testimonials from Payload:", error);
    return [];
  }
}

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <main className="w-full max-w-[1200px] mx-auto px-margin-mobile md:px-24 pt-4 pb-16">
      <Hero />
      <TechStack />
      <Experience />
      <Projects />
      <TestimonialsSection initialTestimonials={testimonials} />
    </main>
  );
}
