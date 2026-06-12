import { generateImage, generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import {
    convertMarkdownToLexical,
    editorConfigFactory,
} from '@payloadcms/richtext-lexical'
import config from "@payload-config";
import { getPayload } from 'payload'

const google = createGoogleGenerativeAI({
    apiKey: process.env.AI_GATEWAY_API_KEY,
})

const payload = await getPayload({ config })

export async function POST(req: Request) {
    const headers = req.headers;
    if (!headers.get("Authorization")) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    const authHeader = headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    const { user } = await payload.auth({
        headers: new Headers({
            Authorization: `JWT ${token}`,
        }),
    })

    if (!user) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 });
    }

    try {
        const title_response = await generateText({
            model: google("gemini-3.1-flash-lite-preview"),
            prompt: `
        You are an expert SEO content strategist specializing in technical content.

        Generate exactly ONE unique, high-quality technical blog topic.

        Requirements:
        - The topic must be SEO-friendly and optimized for organic search.
        - Focus on software development, web development, AI, DevOps, cloud computing, databases, cybersecurity, or system design.
        - Target developers, engineers, or technical professionals.
        - Prefer long-tail keywords with strong search intent.
        - The topic should be practical, actionable, and relevant to current industry trends.
        - Avoid generic or overused titles.
        - Do not repeat previously generated topics.
        - Only give single line topic
        `
        })

        const title = title_response.text;

        const slug = slugify(title);

        const { text } = await generateText({
            model: google("gemini-3.1-flash-lite-preview"),
            prompt: `
                    Write a comprehensive, SEO-optimized blog post on the topic: "${title}".

                    Requirements:

                    * Create an engaging title that attracts clicks while remaining professional.
                    * Use a conversational yet authoritative tone.
                    * Begin with a compelling introduction that explains why the topic matters.
                    * Organize the content with clear H2 and H3 headings.
                    * Include practical examples, real-world use cases, and actionable insights.
                    * Explain technical concepts in simple language while maintaining accuracy.
                    * Add code examples where relevant and explain them thoroughly.
                    * Include best practices, common mistakes, and expert tips.
                    * Optimize the content for SEO without keyword stuffing.
                    * Include statistics or industry insights when appropriate.
                    * End with a concise conclusion and key takeaways.

                    Additional Instructions:

                    * Target a word count of 1000 words.
                    * Ensure all information is up-to-date and factually accurate.
                    * Avoid generic filler content.
                    * Provide unique insights and practical value.
                        * Format the article using Markdown.
                        * Make the content suitable for publication on a professional technology blog.
                        * Create the Blog as Markdown
                        `,
        });

        let uploadedMedia: any;

        try {


            const { image } = await generateImage({
                model: google.image("gemini-2.5-flash-image"),
                prompt: `
                Create a modern, eye-catching blog thumbnail for the article titled "${title}".
                
                Design Style:
                
                Professional and high-quality
                Clean composition with strong visual hierarchy
                Vibrant colors and high contrast
                Modern tech-inspired aesthetic
                Suitable for a blog cover and social media sharing
                
                    Visual Elements:
                    
                    Include imagery related to ${title}
                    Use relevant icons, illustrations, or realistic visuals
                    Add subtle gradients and lighting effects
                    Maintain ample whitespace for readability
                    Technical Requirements:
                    
                    16:9 aspect ratio
                    Ultra-high resolution
                    Sharp details and crisp typography
                    Professional blog banner quality
                    No watermarks, logos, or unnecessary text`,
            })

            const imageBuffer = Buffer.from(image.uint8Array)

            uploadedMedia = await payload.create({
                collection: 'media',
                data: {
                    alt: title,
                },
                file: {
                    data: imageBuffer,
                    mimetype: 'image/png',
                    name: `${slug}.png`,
                    size: imageBuffer.length,
                },
            })
        } catch (error) {
            console.log(error)
        }

        const lexicalJSON = convertMarkdownToLexical({
            editorConfig: await editorConfigFactory.default({
                config: await config,
            }),
            markdown: text,
        })

        await payload.create({
            collection: 'blogs',
            data: {
                title,
                slug,
                content: lexicalJSON,
                image: uploadedMedia,
            },
        })

        return NextResponse.json({
            success: true,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};