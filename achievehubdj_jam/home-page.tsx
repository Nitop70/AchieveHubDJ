import { ImageIcon, LinkIcon, Trophy, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserStats } from "@/components/user-stats"
import type { User } from "@/types/user"
import { Header } from "@/components/header"

// This would typically come from an API or authentication context
const currentUser: User = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  avatar: "/placeholder.svg",
  stats: {
    followers: 0,
    following: 0,
    achievements: 0,
  },
}

// Sample posts data
const samplePosts = [
  {
    id: 1,
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    content: "Just earned my first achievement! 🏆",
    timestamp: "2h ago",
  },
  {
    id: 2,
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg",
    },
    content: "Reached a new milestone today! 🎉",
    timestamp: "4h ago",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} />

      <main className="container py-6">
        {/* Adjusted grid columns ratio to give more space to posts */}
        <div className="grid gap-6 md:grid-cols-[240px_1fr_280px]">
          {/* Left Sidebar remains the same */}
          <div className="space-y-6">
            <UserStats user={currentUser} />
            <Card className="bg-secondary">
              <CardHeader className="font-semibold">Last Achievement</CardHeader>
              <CardContent className="p-4">
                <Trophy className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p className="text-sm text-center text-muted-foreground">No achievements yet</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary">
              <CardHeader className="font-semibold">Achievement Log</CardHeader>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full">
                  View Log
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Posts */}
          <div className="space-y-6">
            <Tabs defaultValue="for-you" className="w-full">
              <TabsList className="w-full bg-secondary">
                <TabsTrigger
                  value="for-you"
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  For You
                </TabsTrigger>
                <TabsTrigger
                  value="following"
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Following
                </TabsTrigger>
              </TabsList>
              <TabsContent value="for-you" className="mt-6 space-y-6">
                {/* Post Creation Card */}
                <Card className="bg-secondary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <Input placeholder="I achieved something!" className="flex-1 bg-white text-lg" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <ImageIcon className="h-5 w-5 mr-2" />
                          Image
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-5 w-5 mr-2" />
                          Video
                        </Button>
                        <Button variant="ghost" size="sm">
                          <LinkIcon className="h-5 w-5 mr-2" />
                          Link
                        </Button>
                      </div>
                      <Button size="lg">Post</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Posts */}
                {samplePosts.map((post) => (
                  <Card key={post.id} className="bg-secondary">
                    <CardHeader className="flex-row items-start space-y-0 p-6">
                      <div className="flex gap-4 w-full">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-lg">{post.author.name}</p>
                            <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                          </div>
                          <p className="text-base mt-1">{post.content}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardFooter className="p-4">
                      <div className="flex items-center gap-6 w-full">
                        <Button variant="ghost" size="sm" className="text-lg">
                          ❤️
                          <span className="sr-only">Like</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-lg">
                          💬<span className="sr-only">Comment</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-lg">
                          ↗️
                          <span className="sr-only">Share</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-auto text-lg">
                          🔖<span className="sr-only">Save</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="following" className="mt-6">
                {/* Following tab content */}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Made more compact */}
          <div className="space-y-4">
            <Card className="bg-secondary">
              <CardContent className="p-3">
                <h2 className="font-semibold mb-3 text-sm">Celebrities to Follow:</h2>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src="/placeholder.svg" alt="Celebrity" />
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Celeb #{i + 1}</span>
                      </div>
                      <Button size="sm" className="h-7 px-3 text-xs">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary">
              <CardContent className="p-3">
                <h2 className="font-semibold mb-3 text-sm">People You Might Know:</h2>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src="/placeholder.svg" alt="Person" />
                          <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Person #{i + 1}</span>
                      </div>
                      <Button size="sm" className="h-7 px-3 text-xs">
                        Connect
                      </Button>
                    </div>
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

