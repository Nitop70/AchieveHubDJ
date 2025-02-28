"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import type { User } from "@/types/user"
import { Header } from "@/components/header"
import { useState } from "react"
import { celebrityAchievements } from "@/lib/achievements-data"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfilePageProps {
  user: User & { bio?: string }
  isCurrentUser: boolean
}

// Sample achievements for regular users
const userAchievements = [
  {
    id: 1,
    icon: "🎯",
    title: "First Post",
    description: "Posted your first achievement",
    date: "January 2024",
    category: "Platform",
  },
  {
    id: 2,
    icon: "👥",
    title: "Connected",
    description: "Made your first friend connection",
    date: "January 2024",
    category: "Social",
  },
  {
    id: 3,
    icon: "📱",
    title: "Early Adopter",
    description: "Joined AchieveHub in its first month",
    date: "December 2023",
    category: "Platform",
  },
  {
    id: 4,
    icon: "💫",
    title: "Rising Star",
    description: "Reached 10 followers",
    date: "December 2023",
    category: "Social",
  },
  {
    id: 5,
    icon: "💭",
    title: "Conversation Starter",
    description: "Made 5 comments on others' achievements",
    date: "December 2023",
    category: "Social",
  },
  {
    id: 6,
    icon: "🌟",
    title: "Achievement Hunter",
    description: "Logged 5 personal achievements",
    date: "December 2023",
    category: "Platform",
  },
]

export default function ProfilePage({ user, isCurrentUser }: ProfilePageProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // In a real app, this would make an API call to update the follow status
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            {/* Profile Info */}
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="object-cover" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center gap-4">
                      <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">@{user.username}</p>
                        {user.bio && <p className="text-muted-foreground">{user.bio}</p>}
                        <p className="text-muted-foreground">
                          {user.stats.followers.toLocaleString()} Followers | {user.stats.following.toLocaleString()}{" "}
                          Following | {user.stats.achievements} Achievements
                        </p>
                      </div>
                      {!isCurrentUser && (
                        <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"}>
                          {isFollowing ? "Following" : "Follow"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Navigation */}
            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="w-full justify-start bg-secondary h-auto p-0 space-x-2">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Achievements
                </TabsTrigger>
                <TabsTrigger
                  value="friends"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Friends
                </TabsTrigger>
                <TabsTrigger
                  value="posts"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="replies"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Replies
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Saved
                </TabsTrigger>
              </TabsList>

              {/* Tab Contents */}
              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6">
                  <Card className="bg-secondary">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {[
                          { text: "Earned a new achievement in Sports", time: "2 hours ago" },
                          { text: "Connected with Jane Smith", time: "5 hours ago" },
                          { text: "Posted a new achievement", time: "1 day ago" },
                          { text: "Reached 100 followers milestone", time: "2 days ago" },
                        ].map((activity, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <p className="text-sm">{activity.text}</p>
                            <span className="text-sm text-muted-foreground">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Achievement Statistics</h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{user.stats.achievements}</p>
                          <p className="text-sm text-muted-foreground">Total Achievements</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">12</p>
                          <p className="text-sm text-muted-foreground">This Month</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">127</p>
                          <p className="text-sm text-muted-foreground">All Time Points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Achievements Tab - Keep existing content */}
              <TabsContent value="achievements" className="mt-6">
                {isCurrentUser ? (
                  // Regular user view with achievement categories
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {userAchievements.map((achievement) => (
                        <Card key={achievement.id} className="bg-secondary">
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div className="text-4xl mb-2">{achievement.icon}</div>
                              <h3 className="font-semibold">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              <p className="text-xs text-muted-foreground">{achievement.date}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Celebrity view using the real achievements data
                  <div className="space-y-6">
                    {Object.entries(
                      celebrityAchievements[user.username as keyof typeof celebrityAchievements] || {},
                    ).map(([category, achievements]) => (
                      <div key={category} className="space-y-4">
                        <h3 className="text-lg font-semibold capitalize">{category.replace("-", " ")}</h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {achievements.map((achievement) => (
                            <Card key={achievement.id} className="bg-secondary">
                              <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center space-y-2">
                                  <div className="text-4xl mb-2">{achievement.icon}</div>
                                  <h3 className="font-semibold">{achievement.title}</h3>
                                  <div className="text-sm font-medium text-primary">{achievement.count}</div>
                                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                  <p className="text-xs text-muted-foreground">{achievement.years}</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Friends Tab */}
              <TabsContent value="friends" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "Sarah Wilson", username: "sarahw", mutual: 12 },
                    { name: "Michael Chen", username: "mikechen", mutual: 8 },
                    { name: "Emma Thompson", username: "emmat", mutual: 15 },
                    { name: "David Kim", username: "davidk", mutual: 6 },
                    { name: "Lisa Park", username: "lisap", mutual: 10 },
                    { name: "Alex Rivera", username: "alexr", mutual: 4 },
                  ].map((friend, i) => (
                    <Card key={i} className="bg-secondary">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-muted" />
                          <div className="flex-1">
                            <p className="font-semibold">{friend.name}</p>
                            <p className="text-sm text-muted-foreground">@{friend.username}</p>
                            <p className="text-sm text-muted-foreground">{friend.mutual} mutual friends</p>
                          </div>
                          <Button size="sm">Message</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Posts Tab */}
              <TabsContent value="posts" className="mt-6">
                <div className="space-y-4">
                  {[
                    {
                      title: "Completed my first marathon! 🏃‍♂️",
                      content:
                        "After months of training, finally achieved this milestone. Thanks to everyone who supported me!",
                      likes: 24,
                      comments: 8,
                      time: "2 days ago",
                    },
                    {
                      title: "New certification achieved! 📚",
                      content: "Just completed my advanced web development certification. Ready for new challenges!",
                      likes: 45,
                      comments: 12,
                      time: "5 days ago",
                    },
                  ].map((post, i) => (
                    <Card key={i} className="bg-secondary">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                          <span>{post.time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Replies Tab */}
              <TabsContent value="replies" className="mt-6">
                <div className="space-y-4">
                  {[
                    {
                      replyTo: "Sarah Wilson",
                      content: "Congratulations on your achievement! Well deserved! 🎉",
                      post: "Won the regional chess tournament",
                      time: "1 day ago",
                    },
                    {
                      replyTo: "Michael Chen",
                      content: "That's amazing! Keep up the great work! 💪",
                      post: "Completed 30-day coding challenge",
                      time: "3 days ago",
                    },
                  ].map((reply, i) => (
                    <Card key={i} className="bg-secondary">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-muted" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-1">
                              Replying to <span className="font-semibold">@{reply.replyTo}</span> on "{reply.post}"
                            </p>
                            <p className="mb-2">{reply.content}</p>
                            <p className="text-sm text-muted-foreground">{reply.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Saved Tab */}
              <TabsContent value="saved" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      type: "Achievement",
                      title: "Marathon Runner",
                      user: "Sarah Wilson",
                      date: "Saved 2 days ago",
                    },
                    {
                      type: "Post",
                      title: "Tips for Better Time Management",
                      user: "Michael Chen",
                      date: "Saved 1 week ago",
                    },
                    {
                      type: "Achievement",
                      title: "Master Chef Certificate",
                      user: "Emma Thompson",
                      date: "Saved 2 weeks ago",
                    },
                  ].map((saved, i) => (
                    <Card key={i} className="bg-secondary">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">{saved.type}</p>
                          <p className="font-semibold">{saved.title}</p>
                          <p className="text-sm">by @{saved.user}</p>
                          <p className="text-sm text-muted-foreground">{saved.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Celebrities to Follow */}
            <Card className="bg-secondary">
              <CardContent className="p-3">
                <h2 className="font-semibold mb-3 text-sm">Celebrities to Follow:</h2>
                <div className="space-y-3">
                  {[
                    {
                      name: "Roger Federer",
                      username: "rogerfederer",
                      avatar:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lv5BX116P5lDt2iyHRJVNbGiIUOsDp.png",
                      achievements: 103,
                      description: "20x Grand Slam Champion 🎾",
                    },
                    {
                      name: "Kendrick Lamar",
                      username: "kendricklamar",
                      avatar:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tvr0Bo3XmB6HmXk4c8dVK5rmrKQfni.png",
                      achievements: 65,
                      description: "5x Grammy Winner 🎵",
                    },
                    {
                      name: "Michelle Obama",
                      username: "michelleobama",
                      avatar:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelle_Obama_2013_official_portrait.jpg/800px-Michelle_Obama_2013_official_portrait.jpg",
                      achievements: 42,
                      description: "Former First Lady, Author 📚",
                    },
                    {
                      name: "Elon Musk",
                      username: "elonmusk",
                      avatar:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                      achievements: 89,
                      description: "Tech Entrepreneur, Space Explorer 🚀",
                    },
                    {
                      name: "Taylor Swift",
                      username: "taylorswift",
                      avatar:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/800px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png",
                      achievements: 95,
                      description: "13x Grammy Winner, Record Breaker 🎸",
                    },
                    {
                      name: "Cristiano Ronaldo",
                      username: "cristiano",
                      avatar:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/800px-Cristiano_Ronaldo_2018.jpg",
                      achievements: 110,
                      description: "5x Ballon d'Or Winner ⚽",
                    },
                    {
                      name: "Malala Yousafzai",
                      username: "malala",
                      avatar:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Malala_Yousafzai_at_Girl_Summit_2014.jpg/800px-Malala_Yousafzai_at_Girl_Summit_2014.jpg",
                      achievements: 38,
                      description: "Nobel Peace Prize Winner, Education Activist 📚",
                    },
                    {
                      name: "Lewis Hamilton",
                      username: "lewishamilton",
                      avatar:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg/800px-Lewis_Hamilton_2016_Malaysia_2.jpg",
                      achievements: 82,
                      description: "7x F1 World Champion 🏎️",
                    },
                  ]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map((celeb) => (
                      <Link href={`/profile/${celeb.username}`} key={celeb.username}>
                        <div className="flex items-center justify-between group hover:bg-muted rounded-lg p-2 transition-colors">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10 border">
                              <AvatarImage src={celeb.avatar} alt={celeb.name} className="object-cover" />
                              <AvatarFallback>{celeb.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                {celeb.name}
                              </span>
                              <p className="text-xs text-muted-foreground">{celeb.description}</p>
                              <p className="text-xs text-muted-foreground">🏆 {celeb.achievements} achievements</p>
                            </div>
                          </div>
                          <Button size="sm" className="h-8 px-3 text-xs">
                            Follow
                          </Button>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* People You Might Know */}
            <Card>
              <CardContent className="p-3">
                <h2 className="font-semibold mb-3 text-sm text-foreground">People You Might Know:</h2>
                <div className="space-y-3">
                  {[
                    {
                      name: "Emma Thompson",
                      username: "emmathompson",
                      avatar:
                        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
                      title: "Software Engineer at Google",
                    },
                    {
                      name: "Michael Chen",
                      username: "michaelchen",
                      avatar:
                        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop",
                      title: "Product Designer at Apple",
                    },
                    {
                      name: "Sarah Wilson",
                      username: "sarahwilson",
                      avatar:
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
                      title: "Data Scientist at Tesla",
                    },
                  ].map((person) => (
                    <Link href={`/profile/${person.username}`} key={person.username}>
                      <div className="flex items-center justify-between group hover:bg-muted rounded-lg p-2 transition-colors">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={person.avatar} alt={person.name} className="object-cover" />
                            <AvatarFallback>{person.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <span className="text-sm font-medium group-hover:text-primary transition-colors">
                              {person.name}
                            </span>
                            <p className="text-xs text-muted-foreground">{person.title}</p>
                          </div>
                        </div>
                        <Button size="sm" className="h-8 px-3 text-xs">
                          Connect
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

