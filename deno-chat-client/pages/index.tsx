/** @jsx h */
import { h, PageConfig, useCallback, useEffect, useState } from "../deps.ts";

interface IMessage {
  text: string
}

export default function Home() {
  const [messages, setMessages] = useState<IMessage[]>([])

  const [text, setText] = useState("")


  const getMessages = useCallback(async () => {
    const res = await fetch('https://ghassen-deno-chat.deno.dev/messages');
    const data = await res.json()
    setMessages(data);
  }, []
  )
  const onSendMessage = useCallback(async () => {
    await fetch('https://ghassen-deno-chat.deno.dev/messages', {
      method: 'POST',
      headers: {
        "content-Type": 'application/json'
      },
      body: JSON.stringify({ text })
    })
    setText('')
    getMessages()

  }, [text])

  useEffect(() => {
    getMessages();
  }, [])

  return (
    <div>
      <div>{JSON.stringify(messages)}</div>
      <input type="text" value={text} onChange={(evt) => setText((evt.currentTarget as HTMLInputElement).value)} />
      <button onClick={onSendMessage}>Add</button>
    </div>
  );
}



export const config: PageConfig = { runtimeJS: true };



