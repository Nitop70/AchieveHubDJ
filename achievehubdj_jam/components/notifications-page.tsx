"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Trophy, Heart, MessageCircle, UserPlus } from "lucide-react"
import type { User } from "@/types/user"

// Sample user data
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

// Sample notifications data
type NotificationType = "achievement" | "like" | "follow" | "comment"

interface Notification {
  id: string
  type: NotificationType
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  read: boolean
  link: string
}

const notifications: { date: string; items: Notification[] }[] = [
  {
    date: "Today",
    items: [
      {
        id: "1",
        type: "achievement",
        user: {
          name: "Sarah Wilson",
          avatar: "/placeholder.svg",
        },
        content: "earned the 'Early Bird' achievement",
        timestamp: "2 hours ago",
        read: false,
        link: "#",
      },
      {
        id: "2",
        type: "like",
        user: {
          name: "Michael Chen",
          avatar: "/placeholder.svg",
        },
        content: "liked your achievement 'Marathon Runner'",
        timestamp: "4 hours ago",
        read: false,
        link: "#",
      },
    ],
  },
  {
    date: "Yesterday",
    items: [
      {
        id: "3",
        type: "follow",
        user: {
          name: "Emma Thompson",
          avatar: "/placeholder.svg",
        },
        content: "started following you",
        timestamp: "1 day ago",
        read: true,
        link: "#",
      },
      {
        id: "4",
        type: "comment",
        user: {
          name: "Alex Rivera",
          avatar: "/placeholder.svg",
        },
        content: "commented on your achievement 'Code Master'",
        timestamp: "1 day ago",
        read: true,
        link: "#",
      },
    ],
  },
  {
    date: "This Week",
    items: [
      {
        id: "5",
        type: "achievement",
        user: {
          name: "Lisa Park",
          avatar: "/placeholder.svg",
        },
        content: "earned the 'Team Player' achievement",
        timestamp: "3 days ago",
        read: true,
        link: "#",
      },
      {
        id: "6",
        type: "like",
        user: {
          name: "David Kim",
          avatar: "/placeholder.svg",
        },
        content: "liked your achievement 'Public Speaker'",
        timestamp: "5 days ago",
        read: true,
        link: "#",
      },
    ],
  },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "achievement":
      return <Trophy className="h-4 w-4 text-yellow-500" />
    case "like":
      return <Heart className="h-4 w-4 text-red-500" />
    case "follow":
      return <UserPlus className="h-4 w-4 text-green-500" />
    case "comment":
      return <MessageCircle className="h-4 w-4 text-blue-500" />
  }
}

export default function NotificationsPage() {
  const [notificationState, setNotificationState] = useState(notifications)

  const markAllAsRead = () => {
    setNotificationState(
      notificationState.map((group) => ({
        ...group,
        items: group.items.map((item) => ({ ...item, read: true })),
      })),
    )
  }

  const markAsRead = (notificationId: string) => {
    setNotificationState(
      notificationState.map((group) => ({
        ...group,
        items: group.items.map((item) => (item.id === notificationId ? { ...item, read: true } : item)),
      })),
    )
  }

  const unreadCount = notificationState.flatMap((group) => group.items).filter((item) => !item.read).length

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} />

      <main className="py-5">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <p className="text-sm text-muted-foreground">You have {unreadCount} unread notifications</p>
                </div>
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead} className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Mark all as read
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {notificationState.map((group) => (
                    <div key={group.date}>
                      <div className="sticky top-0 bg-muted/50 backdrop-blur-sm p-2 px-4">
                        <h3 className="text-sm font-medium text-muted-foreground">{group.date}</h3>
                      </div>
                      <div className="divide-y">
                        {group.items.map((notification) => (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors ${
                              !notification.read ? "bg-muted/20" : ""
                            }`}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                              <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm">
                                <span className="font-medium">{notification.user.name}</span> {notification.content}
                              </p>
                              <div className="flex items-center gap-2">
                                {getNotificationIcon(notification.type)}
                                <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                              </div>
                            </div>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

