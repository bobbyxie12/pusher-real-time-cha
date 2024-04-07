"use client";

import { pusherClient } from "../lib/pusher/client";
import { useEffect, useState } from "react";

export default function MessageList() {
  const [messages, setMessages] = useState<any>([]);
  const [inputMessageBobby, setInputMessageBobby] = useState("");
  const [inputMessageJohn, setInputMessageJohn] = useState("");
  useEffect(() => {
    const channel = pusherClient
      //### Subscribe
      // - **What it does**: The `subscribe` method is used to subscribe the client to a specific channel.
      // A channel in Pusher is a medium through which messages are transmitted. Channels can be public, private, or presence channels.
      // By subscribing to a channel, the client expresses interest in receiving messages or events that are broadcasted on that channel.

      // - **How it's used in your code**: `pusherClient.subscribe('private-chat')` subscribes the client to a channel named `private-chat`.
      // This means that the client is now listening for any events that are broadcasted on this channel.

      .subscribe("private-chat")
      //### Bind

      // - **What it does**: The `bind` method attaches an event handler to a specific event type within the channel the client is subscribed to.
      // Whenever that event is triggered on the channel, the bound event handler is called with the event's data.

      // - **How it's used in your code**: `.bind("evt::test", (data: any) => { ... })` binds an event handler to the `evt::test` event on the subscribed channel.
      //  Whenever the `evt::test` event is broadcasted on the `private-chat` channel, the function `(data: any) => { console.log("test", data); setMessages([...messages, data]); }` is executed. This function logs the event data to the console and updates the `messages` state by adding the new message data to the existing array of messages. This is how your application can dynamically display real-time messages without needing to refresh the page.
      .bind("evt::test", (data: any) => {
        console.log("test", data);
        setMessages([...messages, data]);
      });
    // Returns a cleanup function that gets executed when the component unmounts or before the effect runs again.
    // channel.unbind() removes all bound event handlers from the channel, preventing memory leaks and unnecessary operations when the component is no longer in use.
    return () => {
      channel.unbind();
    };
  }, [messages]);
  //test function
  const handleTestClick = async () => {
    let data = await fetch("/api/test1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "test" }),
    });
    let json = await data.json();
    console.log(json);
  };
  const handleSendMessage = async (e: any) => {
    e.preventDefault(); // Prevent default form submission
    if (!inputMessageBobby.trim()) return; // Ignore empty messages

    // Send the message to the server
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessageBobby }),
      });
      const json = await response.json();
      console.log("Server response:", json);
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setInputMessageBobby(""); // Clear the input after sending
  };

  const handleSendMessageJohn = async (e: any) => {
    e.preventDefault(); // Prevent default form submission
    if (!inputMessageJohn.trim()) return; // Ignore empty messages

    // Send the message to the server
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessageJohn }),
      });
      const json = await response.json();
      console.log("Server response:", json);
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setInputMessageJohn(""); // Clear the input after sending
  };
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessageBobby}
          onChange={(e: any) => {
            setInputMessageBobby(e.target.value);
          }}
        />
        <button
          className="w-[240px] bg-slate-600 hover:bg-slate-500 rounded p-2 m-2"
          type="submit"
        >
          Send as Bobby
        </button>
      </form>

      <form onSubmit={handleSendMessageJohn}>
        <input
          type="text"
          value={inputMessageJohn}
          onChange={(e: any) => {
            setInputMessageJohn(e.target.value);
          }}
        />
        <button
          className="w-[240px] bg-slate-200 hover:bg-slate-500 rounded p-2 m-2"
          type="submit"
        >
          Send as John
        </button>
      </form>

      <button onClick={handleTestClick}>test</button>
      <div>
        {messages.map((message: any) => (
          <div
            className="border border-slate-600 rounded p-2 m-2"
            key={message.date}
          >
            {message.message}
            <br />
            {message.date}
          </div>
        ))}
      </div>
    </div>
  );
}
