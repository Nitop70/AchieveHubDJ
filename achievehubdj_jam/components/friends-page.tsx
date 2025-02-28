"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useInView } from "react-intersection-observer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Users, Loader2 } from "lucide-react"
import type { User } from "@/types/user"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - would come from API in real app
const currentUser: User = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  avatar: "/placeholder.svg",
  stats: {
    followers: 16,
    following: 17,
    achievements: 25,
  },
}

const friends = [
  {
    id: 1,
    name: "Sarah Wilson",
    username: "sarahw",
    avatar: "/placeholder.svg",
    mutualFriends: 12,
    achievements: 45,
    latestPost: {
      content: "Just earned my Gold Medal in Swimming! 🏊‍♀️",
      timestamp: "2h ago",
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    username: "mikechen",
    avatar: "/placeholder.svg",
    mutualFriends: 8,
    achievements: 32,
    latestPost: {
      content: "Completed my first marathon! 🏃‍♂️",
      timestamp: "5h ago",
    },
  },
  {
    id: 3,
    name: "Emma Thompson",
    username: "emmathompson",
    avatar: "/placeholder.svg",
    mutualFriends: 15,
    achievements: 56,
    latestPost: {
      content: "Won the regional chess tournament! ♟️",
      timestamp: "1d ago",
    },
  },
]

// Sample suggestions data
const suggestions = [
  {
    id: 1,
    name: "Scott Ayres",
    title: "Social Media Lab Manager at AgoraPulse",
    avatar: "/placeholder.svg",
    sharedConnections: 23,
  },
  {
    id: 2,
    name: "Richard Beeson",
    title: "SaaS Customer Onboarding Manager",
    avatar: "/placeholder.svg",
    sharedConnections: 7,
  },
  {
    id: 3,
    name: "Jacob Hipertash",
    title: "Social Media Content Strategist",
    avatar: "/placeholder.svg",
    sharedConnections: 5,
  },
  {
    id: 4,
    name: "Stephanie Sweet",
    title: "Customer Support / Software QA Tester",
    avatar: "/placeholder.svg",
    sharedConnections: 4,
  },
  {
    id: 5,
    name: "Sarah Hecker",
    title: "Marketing & Affiliate Manager",
    avatar: "/placeholder.svg",
    sharedConnections: 3,
  },
  {
    id: 6,
    name: "Curt Ziegler",
    title: "Customer Support Lead",
    avatar: "/placeholder.svg",
    sharedConnections: 8,
  },
  {
    id: 7,
    name: "Hannah Recker",
    title: "Outbound Marketing Manager",
    avatar: "/placeholder.svg",
    sharedConnections: 4,
  },
  {
    id: 8,
    name: "Michael Anglietta",
    title: "Growth Marketing Manager",
    avatar: "/placeholder.svg",
    sharedConnections: 3,
  },
]

// Generate more suggestions for infinite scroll
const generateMoreSuggestions = (startIndex: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    name: `Suggested User ${startIndex + i}`,
    title: `${["Software Engineer", "Product Manager", "Designer", "Marketing Manager"][Math.floor(Math.random() * 4)]} at ${
      ["Tech Corp", "Design Co", "Start Up", "Big Corp"][Math.floor(Math.random() * 4)]
    }`,
    avatar: "/placeholder.svg",
    sharedConnections: Math.floor(Math.random() * 20),
  }))
}

export default function FriendsPage() {
  const router = useRouter()
  const [moreSuggestions, setMoreSuggestions] = useState(suggestions)
  const [isLoading, setIsLoading] = useState(false)
  const { ref: loadMoreRef, inView } = useInView()

  // Load more suggestions when scrolling to the bottom
  useEffect(() => {
    const loadMore = async () => {
      if (inView && !isLoading) {
        setIsLoading(true)
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setMoreSuggestions((prev) => [...prev, ...generateMoreSuggestions(prev.length + 1, 8)])
        setIsLoading(false)
      }
    }

    loadMore()
  }, [inView, isLoading])

  const handleViewProfile = (username: string) => {
    router.push(`/profile/${username}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} />

      <main className="py-5">
        <div className="container max-w-6xl">
          <Tabs defaultValue="your-friends" className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="w-[400px] grid grid-cols-2 h-11">
                <TabsTrigger
                  value="your-friends"
                  className="text-base data-[state=active]:bg-[#6366F1] data-[state=active]:text-primary-foreground"
                >
                  Your Friends
                </TabsTrigger>
                <TabsTrigger
                  value="find-friends"
                  className="text-base data-[state=active]:bg-[#6366F1] data-[state=active]:text-primary-foreground"
                >
                  Find Friends
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="your-friends" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                {/* Main Content */}
                <Card className="bg-secondary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Your Friends</h2>
                      </div>
                      <span className="text-sm text-muted-foreground">{friends.length} friends</span>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    {friends.map((friend) => (
                      <Card
                        key={friend.id}
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => handleViewProfile(friend.username)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 shrink-0">
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>{friend.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="font-semibold">{friend.name}</h3>
                                <p className="text-sm text-muted-foreground">@{friend.username}</p>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {friend.mutualFriends} mutual
                                </span>
                                <span className="flex items-center gap-1">
                                  <Trophy className="h-4 w-4" />
                                  {friend.achievements}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/messages?user=${friend.username}`)
                                }}
                              >
                                Message
                              </Button>
                              {friend.latestPost && (
                                <div className="rounded-lg bg-background p-3">
                                  <p className="text-sm">{friend.latestPost.content}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{friend.latestPost.timestamp}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Right Sidebar - Friend Stats */}
                <div className="space-y-6">
                  <Card className="bg-secondary">
                    <CardHeader>
                      <h2 className="font-semibold">Friend Stats</h2>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Friends</span>
                          <span className="font-medium">{friends.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mutual Connections</span>
                          <span className="font-medium">
                            {friends.reduce((sum, friend) => sum + friend.mutualFriends, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Friend Achievements</span>
                          <span className="font-medium">
                            {friends.reduce((sum, friend) => sum + friend.achievements, 0)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardHeader>
                      <h2 className="font-semibold">Achievement Distribution</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sports</span>
                          <span>8 friends</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full w-[40%] bg-primary rounded-full" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Academic</span>
                          <span>12 friends</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full w-[60%] bg-primary rounded-full" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Arts</span>
                          <span>5 friends</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full w-[25%] bg-primary rounded-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="find-friends" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">People you may know</h2>
                  <p className="text-sm text-muted-foreground">Based on your profile and connections</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {moreSuggestions.map((person) => (
                    <Card key={person.id} className="bg-secondary">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center gap-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={person.avatar} alt={person.name} />
                            <AvatarFallback>{person.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <h3 className="font-semibold leading-none">{person.name}</h3>
                            <p className="text-sm text-muted-foreground">{person.title}</p>
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-3 w-3" />
                              <span>{person.sharedConnections} shared connections</span>
                            </div>
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Loading indicator */}
                <div ref={loadMoreRef} className="flex justify-center items-center py-8">
                  {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading more suggestions...</span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

