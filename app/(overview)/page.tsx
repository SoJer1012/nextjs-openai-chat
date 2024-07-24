'use client';

import { useChat } from 'ai/react';
import { Button, Message, VoiceIcon } from '../components';

export default function Chat() {
   const {
    error,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    messages,
    reload,
    stop,
  } = useChat({
    keepLastMessageOnError: true,
  });
  return (
    <div className="flex h-full w-full flex-col max-w-screen-md">
      <div
        className="relative flex-1 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7"
      >
        <Message messages={messages} typing={isLoading} />
        {error && (
          <div className="mt-4">
            <div className="text-red-500">An error occurred.</div>
            <Button
              type="button"
              className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
              onClick={() => reload()}
            >
              Retry
            </Button>
          </div>
        )}
        {isLoading && (
         <div className="mt-4 text-gray-500">
           <Button
             type="button"
             className="absolute bottom-0 right-1/2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
             onClick={stop}
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
            disabled={isLoading || error != null}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
            disabled={isLoading || error != null}
            onClick={handleSubmit}
          >
            Send <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
