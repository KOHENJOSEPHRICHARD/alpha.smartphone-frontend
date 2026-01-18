"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const suggestedQuestions = [
  {
    question: "What's the best phone for photography?",
    displayText: "Best phone for photography?",
  },
  {
    question: "Show me phones with the longest battery life",
    displayText: "Longest battery life?",
  },
  {
    question: "Which phone is best for gaming?",
    displayText: "Best phone for gaming?",
  },
  {
    question: "What are your newest arrivals?",
    displayText: "Newest arrivals?",
  },
  {
    question: "Tell me about phone warranty and return policy",
    displayText: "Warranty & returns?",
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const [input, setInput] = useState("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "in_progress") return

    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    sendMessage({ text: question })
    setInput("")
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full shadow-2xl bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 border-2 border-accent/20 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <MessageCircle className="h-6 w-6 md:h-7 md:w-7 relative z-10 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[400px] max-w-[400px]"
          >
            <Card className="flex flex-col h-[500px] md:h-[600px] shadow-2xl border-2 border-accent/20 overflow-hidden glass-card">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-accent/10 to-secondary/10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Alpha.SmartPhone</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-accent/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3 pt-8"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 mb-2">
                      <MessageCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h4 className="font-semibold text-base">How can I help you?</h4>
                    <p className="text-sm text-muted-foreground px-4">
                      Ask me about our phones, get recommendations, or compare models!
                    </p>
                    <div className="flex flex-col gap-2 pt-4 px-2">
                      {suggestedQuestions.map((item, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestedQuestion(item.question)}
                          className="text-xs justify-start h-auto py-2.5 px-3 border-accent/20 hover:bg-accent/5 hover:border-accent/40 transition-all"
                        >
                          {item.displayText}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                        message.role === "user"
                          ? "bg-gradient-to-br from-accent to-accent/80 text-white shadow-lg"
                          : "bg-card border border-border shadow-sm",
                      )}
                    >
                      {message.parts.map((part, partIndex) => {
                        if (part.type === "text") {
                          return (
                            <p key={partIndex} className="whitespace-pre-wrap leading-relaxed">
                              {part.text}
                            </p>
                          )
                        }
                        return null
                      })}
                    </div>
                  </motion.div>
                ))}

                {status === "in_progress" && messages[messages.length - 1]?.role === "user" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t bg-background/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about phones..."
                    disabled={status === "in_progress"}
                    className="flex-1 bg-background border-accent/20 focus-visible:ring-accent"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || status === "in_progress"}
                    className="bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg"
                  >
                    {status === "in_progress" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">Powered by AI • Alpha.SmartPhone</p>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
