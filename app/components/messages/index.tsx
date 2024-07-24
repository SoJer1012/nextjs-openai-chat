import Markdown from 'markdown-to-jsx';
import { AgreeIcon, Button, CopyIcon, DisagreeIcon } from '../';

export interface IMessage {
  role: string;
  content: string;
}

// const styles = {
//   cursor: {
//     display: 'inline-block',
//     width: '2px',
//     height: '10px',
//     backgroundColor: '#000',
//     animation: 'blink 1s infinite',
//   },
// };

export function Message({ messages, typing }: { messages: IMessage[], typing: boolean }) {

  const markdown = (index: number) => {
    return index === (messages.length - 1) && typing ? 'markdown-typing' : 'markdown'
  }

  return messages.map((m, index) => {
    if (m.role === 'user') {
      return (
        <div key={m.content + '-' + index + '-' + m.role}>
          <div className="flex flex-row px-2 py-4 sm:px-4">
            <img
              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
              src="https://dummyimage.com/256x256/363536/ffffff&text=U"
            />
            <div className="flex max-w-3xl items-center">
              {/* <p>{m.content}</p> */}
              <Markdown>{m.content}</Markdown>
            </div>
          </div>
          <div className="mb-2 flex w-full flex-row justify-end gap-x-2 text-slate-500">
            <Button className="hover:text-blue-600">
              <AgreeIcon />
            </Button>
            <Button className="hover:text-blue-600" type="button">
              <DisagreeIcon />
            </Button>
            <Button className="hover:text-blue-600" type="button">
              <CopyIcon />
            </Button>
          </div>
        </div>
      )
    }
    if (m.role === 'assistant') {
      return (
        <div
          className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 dark:bg-slate-900 sm:px-4"
          key={m.content + '-' + index + '-' + m.role}
        >
          <img
            className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
            src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
          />
          <div className="flex-1 flex max-w-3xl items-center rounded-xl">
            <Markdown className={markdown(index)}>
              {m.content}
            </Markdown>
            {/* {index === (messages.length - 1) && typing && <span style={styles.cursor} />} */}
          </div>
        </div>
      )
    }
  })
}
