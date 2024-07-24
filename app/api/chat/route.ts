import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "",
});

export const maxDuration = 30;

export async function POST(req: any) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToCoreMessages(messages),
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      console.log(text);
      console.log(toolCalls);
      console.log(toolResults);
      console.log(usage);
      console.log(finishReason);
    },
  });
  return result.toAIStreamResponse();
}
