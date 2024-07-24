'use client';

import { useState } from "react";
import { continueConversation, IMessage } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { Button, Message, VoiceIcon } from '../components';



export default function Stream() {
  const [conversation, setConversation] = useState<IMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: { preventDefault?: () => void }) => {
    event.preventDefault?.();
    try {
      const history: IMessage[] = [
        ...conversation,
        { role: "user", content: input },
        { role: "assistant", content: "" }
      ];
      setConversation(history)
      const { messages, newMessage } = await continueConversation(history);
      setInput("");
      let textContent = "";
      setIsTyping(true);
      for await (const delta of readStreamableValue(newMessage)) {
        textContent = `${textContent}${delta}`;
        setConversation(messages.map((m, index) => {
          if (index === messages.length - 1) {
            return { ...m, content: textContent };
          } else {
            return {...m }
          }
        }));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      setIsTyping(false);

    } catch (error) {
      setError("An error occurred while processing your request.");
    }
  }

  return (
    <div className="flex h-full w-full flex-col max-w-screen-md">

      <div
        className="relative flex-1 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7"
      >
        <Message messages={conversation} typing={isTyping} />
        {error && (
          <div className="mt-4">
            <div className="text-red-500">An error occurred.</div>
            <Button
              type="button"
              className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            >
              Retry
            </Button>
          </div>
        )}
        {isTyping && (
         <div className="mt-4 text-gray-500">
           <Button
             type="button"
             className="absolute bottom-0 right-1/2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
           >
             Stop
           </Button>
         </div>
       )}
      </div>
      <form className="mt-2" onSubmit={handleSubmit}>
        <label className="sr-only">Enter your content</label>
        <div className="relative">
          <Button type="button"
            className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600">
              <VoiceIcon />
              <span className="sr-only">Use voice input</span>
          </Button>
          <input
            className="block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-500 sm:text-base"
            placeholder="Enter your prompt"
            required
            value={input}
            disabled={isTyping || error != null}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Button
            type="submit"
            className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
            disabled={isTyping || error != null}
            onClick={handleSubmit}
          >
            Send <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
