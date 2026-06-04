import React from "react";

import TestimonialCard from "../components/TestimonialCard";
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
    }));
  } catch (error) {
    console.error("Error fetching testimonials from Payload:", error);
    return [];
  }
}

interface Testimonial {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  content: string;
  rating: number;
  createdAt: string;
  approved?: boolean;
}


export const revalidate = 86400

export default async function TestimonialsPage() {
  const response = await getTestimonials();

  return (
    <section className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center text-on-surface-variant">
        Testimonials
      </h1>
      {/* The carousel already contains navigation arrows within the component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {response.map((testimonial: any) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
