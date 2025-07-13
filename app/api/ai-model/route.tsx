import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { provider, userInput } = await req.json();

    const response = await openai.chat.completions.create({
      model: provider,
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    return NextResponse.json({
      reply: response.choices[0].message,
    });
  } 
  catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
