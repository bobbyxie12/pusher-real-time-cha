// src/app/page.tsx
import MessageList from "../app/components/MessageList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MessageList />
    </main>
  );
}
