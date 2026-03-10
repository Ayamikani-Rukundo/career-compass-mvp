import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

interface Message {
  id?: string;
  sender: "user" | "assistant";
  message: string;
  created_at?: string;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-2 bg-background/50"
      data-testid="chat-window"
    >
      <div className="max-w-2xl mx-auto w-full py-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id || index}
            sender={msg.sender}
            message={msg.message}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
