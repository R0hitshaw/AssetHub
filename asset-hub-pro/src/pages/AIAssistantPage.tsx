import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles, Loader2 } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestedQueries = [
  "How many laptops are expiring warranty this quarter?",
  "Show me unassigned assets worth over $1,000",
  "What's the total asset value by department?",
  "Which employees have the most assets assigned?",
];

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: "Hello! I'm your AI Asset Intelligence assistant. Ask me anything about your IT assets — from inventory insights to optimization recommendations." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1500));
    const response: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: `Based on your query "${input}", here's what I found:\n\n• **Total Assets**: 2,847 tracked across 5 categories\n• **Laptops expiring warranty**: 15 units in the next 30 days\n• **Recommendation**: Schedule bulk warranty renewals for Q2 to save approximately 12% on service contracts.\n\nWould you like me to generate a detailed report?`,
    };
    setMessages((prev) => [...prev, response]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] animate-fade-in">
      <div className="page-header">
        <h1 className="page-title flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          AI Assistant
        </h1>
        <p className="page-subtitle">Get intelligent insights about your IT assets</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[600px] rounded-lg px-4 py-3 text-sm ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-card border shadow-card"
            }`}>
              {msg.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4 text-accent" />
                  <span className="text-xs font-medium text-accent">AI Assistant</span>
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-card border rounded-lg px-4 py-3 shadow-card">
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-2 gap-2 pb-4">
          {suggestedQueries.map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="rounded-lg border bg-card px-3 py-2.5 text-left text-xs text-muted-foreground hover:bg-muted transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 border-t pt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your assets..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={!input.trim() || loading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIAssistantPage;
