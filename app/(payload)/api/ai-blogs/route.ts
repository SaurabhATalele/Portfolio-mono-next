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
            message: "Unauthorized",
        }, { status: 401 });
    }

    const { title, slug } = body;
    if (!title || !slug) {
        return NextResponse.json({
            success: false,
            message: "Title and slug are required",
        }, { status: 400 });
    }

    const { text } = await generateText({
        model: google("gemini-3.1-flash-lite-preview"),
        prompt: `Write a blog post about ${title} using rich text`,
    });

    const { image } = await generateImage({
        model: google.image("imagen-4.0-fast-generate-001"),
        prompt: `Generate a blog cover image for ${title}`,
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

    });
}