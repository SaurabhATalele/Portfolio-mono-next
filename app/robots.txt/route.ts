export const runtime = "edge";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://localhost:3000";

  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/rss.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
