/** @jsx h */
import { h, IS_BROWSER, PageConfig, useCallback, useEffect, useState } from "../deps.ts";

interface IMessage {
  text: string
}

export default function Home() {
  const [messages, setMessages] = useState<IMessage[]>([])


  const getMessages = useCallback(async () => {
    const res = await fetch('https://ghassen-deno-chat.deno.dev/messages');
    const data = await res.json()
    setMessages(data);
  }, []
  )
  useEffect(() => {
    getMessages();
  }, [])

  return (
    <div>
      {JSON.stringify(messages)}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)} disabled={!IS_BROWSER}>
        -1
      </button>
      <button onClick={() => setCount(count + 1)} disabled={!IS_BROWSER}>
        +1
      </button>
    </div>
  );
}

export const config: PageConfig = { runtimeJS: true };



