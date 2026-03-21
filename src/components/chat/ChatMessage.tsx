import { cn } from "@/lib/utils";

interface ChatMessageProps {
  sender: "user" | "assistant";
  message: string;
}

const ChatMessage = ({ sender, message }: ChatMessageProps) => {
  const isUser = sender === "user";

  // Check if the message contains "Caution:" to highlight it
  const cautionIndex = message.indexOf("Caution:");
  const hasCaution = cautionIndex !== -1;

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
          {hasCaution ? (
            <>
              {message.slice(0, cautionIndex)}
              <span className="bg-yellow-200 text-black font-semibold px-1 rounded">
                {message.slice(cautionIndex)}
              </span>
            </>
          ) : (
            message
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
