import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage = ({ message, isBot }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 animate-fade-in max-w-3xl",
        isBot ? "mr-auto" : "ml-auto flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isBot
            ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
            : "bg-accent text-accent-foreground"
        )}
      >
        {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
      </div>
      <div className={cn(
        "flex-1 space-y-2 overflow-hidden rounded-2xl p-3",
        isBot ? "bg-muted/50" : "bg-primary/10"
      )}>
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
