import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput, { ChatInputHandle } from "@/components/ChatInput";
import ThemeToggle from "@/components/ThemeToggle";
import { MessageSquare } from "lucide-react";
import { sendMessage } from "@/services/chatService";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Medical Chatbot. How can I help you today?",
      isBot: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<ChatInputHandle>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: userMessage,
          isBot: true,
        },
      ]);
      setIsTyping(false);

      // Focus input after bot responds
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 100);
    }, 1000);
  };

  const handleSendMessage = async (text: string) => {
    setIsTyping(true);
    const newMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
    };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await sendMessage(text);
      simulateBotResponse(response?.message || "I'm sorry, I didn't understand that.");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Medical Chatbot</h1>
              <p className="text-xs text-muted-foreground">Your health assistant</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-4 py-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message.text} isBot={message.isBot} />
          ))}
          {isTyping && (
            <div className="flex gap-3 p-4 animate-fade-in">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl px-4 py-4">
          <ChatInput ref={chatInputRef} onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </footer>
    </div>
  );
};

export default Index;
