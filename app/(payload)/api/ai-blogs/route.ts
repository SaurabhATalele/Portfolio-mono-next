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

    const body = await req.json();
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
        const { title, slug } = body;
        if (!title || !slug) {
            return NextResponse.json({
                success: false,
                message: "Title and slug are required",
            }, { status: 400 });
        }

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

        const { image } = await generateImage({
            model: google.image("imagen-4.0-fast-generate-001"),
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

        const uploadedMedia = await payload.create({
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