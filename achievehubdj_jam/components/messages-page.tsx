"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, ImageIcon, Smile } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { User } from "@/types/user"

// Update the currentUser stats
const currentUser: User = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ypi9lRb8zKyIhFBoPwQOGPO6OdZSaV.png",
  stats: {
    followers: 1337,
    following: 284,
    achievements: 25,
  },
}

// Sample conversations with unique messages for each user
const conversations = [
  {
    id: 1,
    user: {
      id: "2",
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "/placeholder.svg",
      status: { type: "online" as const },
    },
    lastMessage: "That's amazing! Congratulations! 🎉",
    timestamp: "2m ago",
    unread: 2,
    messages: [
      {
        id: 1,
        senderId: "2",
        text: "Hey! I saw you got the Gold Achievement in Programming! 🏆",
        timestamp: "2:30 PM",
      },
      {
        id: 2,
        senderId: "1",
        text: "Thanks! Yeah, finally completed that advanced coding challenge 💻",
        timestamp: "2:31 PM",
      },
      {
        id: 3,
        senderId: "2",
        text: "That's amazing! Congratulations! 🎉",
        timestamp: "2:31 PM",
      },
    ],
  },
  {
    id: 2,
    user: {
      id: "3",
      name: "Michael Chen",
      username: "mikechen",
      avatar: "/placeholder.svg",
      status: { type: "idle" as const, emoji: "🎮", text: "Playing Chess" },
    },
    lastMessage: "When is the next tournament?",
    timestamp: "1h ago",
    unread: 0,
    messages: [
      {
        id: 1,
        senderId: "3",
        text: "Hey, are you joining the chess tournament next week?",
        timestamp: "1:15 PM",
      },
      {
        id: 2,
        senderId: "1",
        text: "Yes, I've already registered! Looking forward to it.",
        timestamp: "1:20 PM",
      },
      {
        id: 3,
        senderId: "3",
        text: "When is the next tournament?",
        timestamp: "1:21 PM",
      },
    ],
  },
  {
    id: 3,
    user: {
      id: "4",
      name: "Emma Thompson",
      username: "emmathompson",
      avatar: "/placeholder.svg",
      status: { type: "dnd" as const, text: "In a meeting" },
    },
    lastMessage: "See you at the event!",
    timestamp: "2h ago",
    unread: 0,
    messages: [
      {
        id: 1,
        senderId: "4",
        text: "Hi! Are you coming to the achievement ceremony?",
        timestamp: "11:45 AM",
      },
      {
        id: 2,
        senderId: "1",
        text: "Wouldn't miss it! I'll be there at 6.",
        timestamp: "11:50 AM",
      },
      {
        id: 3,
        senderId: "4",
        text: "See you at the event!",
        timestamp: "11:51 AM",
      },
    ],
  },
]

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const [selectedConversation, setSelectedConversation] = useState<(typeof conversations)[0] | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [filteredConversations, setFilteredConversations] = useState(conversations)
  const [searchQuery, setSearchQuery] = useState("")
  const [allConversations, setAllConversations] = useState(conversations)

  // Handle initial conversation selection from URL parameter
  useEffect(() => {
    const username = searchParams.get("user")
    if (username) {
      const conversation = allConversations.find((conv) => conv.user.username === username)
      if (conversation) {
        setSelectedConversation(conversation)
        // Mark messages as read when selecting the conversation
        if (conversation.unread > 0) {
          setAllConversations((prevConversations) =>
            prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unread: 0 } : conv)),
          )
        }
      } else {
        // Create a new conversation for the user
        const newConversation = {
          id: allConversations.length + 1,
          user: {
            id: `new-${Date.now()}`,
            name: username,
            username: username,
            avatar: "/placeholder.svg",
            status: { type: "online" as const },
          },
          lastMessage: "",
          timestamp: "Just now",
          unread: 0,
          messages: [],
        }
        setAllConversations((prev) => [newConversation, ...prev])
        setSelectedConversation(newConversation)
      }
    } else if (allConversations.length > 0) {
      // If no username in URL, select the first conversation
      setSelectedConversation(allConversations[0])
    }
  }, [searchParams, allConversations])

  // Handle search functionality
  useEffect(() => {
    const filtered = allConversations.filter(
      (conversation) =>
        conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredConversations(filtered)
  }, [searchQuery, allConversations])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    const newMessageObj = {
      id: selectedConversation.messages.length + 1,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Update conversations with the new message
    setAllConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, newMessageObj],
              lastMessage: newMessage,
              timestamp: "Just now",
            }
          : conv,
      ),
    )

    // Update selected conversation
    setSelectedConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessageObj],
            lastMessage: newMessage,
            timestamp: "Just now",
          }
        : null,
    )

    // Clear the input
    setNewMessage("")
  }

  const handleConversationSelect = (conversation: (typeof conversations)[0]) => {
    setSelectedConversation(conversation)
    // Mark messages as read when selecting the conversation
    if (conversation.unread > 0) {
      setAllConversations((prevConversations) =>
        prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unread: 0 } : conv)),
      )
    }
    // Update URL with the selected user's username
    const url = new URL(window.location.href)
    url.searchParams.set("user", conversation.user.username)
    window.history.pushState({}, "", url)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} />

      <main className="py-5">
        <div className="container">
          <Card className="h-[calc(100vh-7rem)]">
            <div className="grid h-full md:grid-cols-[320px_1fr]">
              {/* Conversations List */}
              <div className="border-r">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-2 p-4">
                    {filteredConversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => handleConversationSelect(conversation)}
                        className={cn(
                          "w-full flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors",
                          selectedConversation?.id === conversation.id && "bg-secondary",
                        )}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.user.status && (
                            <span
                              className={cn(
                                "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                                {
                                  "bg-green-500": conversation.user.status.type === "online",
                                  "bg-yellow-500": conversation.user.status.type === "idle",
                                  "bg-red-500": conversation.user.status.type === "dnd",
                                  "bg-gray-500": conversation.user.status.type === "invisible",
                                },
                              )}
                            />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{conversation.user.name}</span>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">
                            {conversation.unread}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chat Window */}
              <div className="flex flex-col h-full">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 p-4 border-b">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                          <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                        </Avatar>
                        {selectedConversation.user.status && (
                          <span
                            className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background", {
                              "bg-green-500": selectedConversation.user.status.type === "online",
                              "bg-yellow-500": selectedConversation.user.status.type === "idle",
                              "bg-red-500": selectedConversation.user.status.type === "dnd",
                              "bg-gray-500": selectedConversation.user.status.type === "invisible",
                            })}
                          />
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold">{selectedConversation.user.name}</h2>
                        <p className="text-sm text-muted-foreground">@{selectedConversation.user.username}</p>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedConversation.messages.map((message) => {
                          const isCurrentUser = message.senderId === currentUser.id
                          return (
                            <div key={message.id} className={cn("flex gap-3", isCurrentUser && "justify-end")}>
                              {!isCurrentUser && (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={selectedConversation.user.avatar}
                                    alt={selectedConversation.user.name}
                                  />
                                  <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <div
                                  className={cn(
                                    "rounded-2xl px-4 py-2 max-w-[420px] break-words",
                                    isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary",
                                  )}
                                >
                                  <p>{message.text}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                          <Smile className="h-5 w-5" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                          <Send className="h-5 w-5" />
                        </Button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Select a conversation to start messaging</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

