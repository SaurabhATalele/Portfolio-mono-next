import { getPayload } from "payload";
import config from "@/payload.config";

export const revalidate = 86400

export async function GET() {
    const payload = await getPayload({ config });

    const blogs = await payload.find({
        collection: "blogs",
        limit: 100,
        sort: "-publishedAt",
    });

    const siteUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        "https://saurabhtalele.com";

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Saurabh Talele Blog</title>
  <link>${siteUrl}</link>
  <description>Latest articles on software engineering, AI, and web development.</description>
  <language>en-us</language>

  ${blogs.docs
            .map(
                (post) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${siteUrl}/blogs/${post.slug}</link>
    <guid>${siteUrl}/blogs/${post.slug}</guid>
    <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
    <description><![CDATA[${post.excerpt || ""
                    }]]></description>
  </item>`
            )
            .join("")}
</channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control":
                "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}