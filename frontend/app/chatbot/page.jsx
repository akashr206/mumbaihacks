"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/utils2";

export default function ChatbotPage() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "assistant",
            content:
                "Hello! I'm your Narada AI assistant. How can I help you with hospital operations today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        const aiMessageId = Date.now() + 1;
        const aiMessage = {
            id: aiMessageId,
            role: "assistant",
            content: "",
        };
        setMessages((prev) => [...prev, aiMessage]);

        try {
            const response = await fetch(`${API_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage.content }),
            });

            if (!response.ok) throw new Error("Failed to fetch response");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === aiMessageId
                            ? { ...msg, content: msg.content + chunk }
                            : msg
                    )
                );
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === aiMessageId
                        ? {
                              ...msg,
                              content:
                                  "Sorry, I encountered an error. Please try again.",
                          }
                        : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex relative h-[calc(100vh-80px)] flex-col bg-gray-50 dark:bg-zinc-950">
            <ScrollArea className="flex-1 p-4 ">
                <div className="mx-auto max-w-3xl space-y-6 pb-15 pt-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex w-full gap-4",
                                message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            )}
                        >
                            {message.role === "assistant" && !isLoading && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                    <Bot className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                                </div>
                            )}

                            <div
                                className={cn(
                                    "relative max-w-[80%] rounded-2xl px-5 py-3 text-sm shadow-sm",
                                    message.role === "user"
                                        ? "bg-blue-600 text-white rounded-tr-none"
                                        : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 rounded-tl-none"
                                )}
                            >
                                {message.content}
                            </div>

                            {message.role === "user" && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex w-full gap-4 justify-start">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                <Bot className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-zinc-100 px-5 py-4 dark:bg-zinc-800">
                                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]"></div>
                                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]"></div>
                                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></div>
                            </div>
                        </div>
                    )}

                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* FIXED INPUT AREA */}
            <div className="bord ml-50 max:md:ml-10 fixed bottom-0 left-0 right-0 border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950 flex">
                <div className="mx-auto w-full flex justify-center items-center">
                    <form
                        onSubmit={handleSend}
                        className="flex w-full max-w-3xl items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 shadow-sm 
                        focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 
                        dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            <Sparkles className="h-5 w-5" />
                        </Button>

                        {/* FIXED SPACING: INPUT IS NOW FLEX-1 WITH REAL HEIGHT */}
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 h-10 border-none bg-transparent shadow-none px-3 
                            focus-visible:ring-0 dark:placeholder:text-zinc-500"
                        />

                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim() || isLoading}
                            className={cn(
                                "h-10 w-10 transition-all duration-200",
                                input.trim()
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
                            )}
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
