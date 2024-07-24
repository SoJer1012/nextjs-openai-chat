"use server";

import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createOpenAI } from "@ai-sdk/openai";

export interface IMessage {
  role: "user" | "assistant";
  content: string;
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "http://13.59.183.171:31173/v1",
});

export async function continueConversation(history: IMessage[]) {
  "use server";
  const stream = createStreamableValue();
  const model = openai("gpt-3.5-turbo");

  (async () => {
    const { textStream } = await streamText({
      model: model,
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })().then(() => {});

  return {
    messages: history,
    newMessage: stream.value,
  };
}
