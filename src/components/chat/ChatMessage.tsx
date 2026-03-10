import { cn } from "@/lib/utils";

interface ChatMessageProps {
  sender: "user" | "assistant";
  message: string;
}

const ChatMessage = ({ sender, message }: ChatMessageProps) => {
  const isUser = sender === "user";

  return (
    <div className={cn("flex mb-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] px-4 py-2 rounded-2xl shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-muted-foreground rounded-bl-none border border-border",
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
