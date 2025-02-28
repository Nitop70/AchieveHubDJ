import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import type { User } from "@/types/user"
import { Header } from "@/components/header"

// This would typically come from an API or authentication context
const profileUser: User = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  avatar: "/placeholder.svg",
  dateCreated: "December 2023",
  stats: {
    followers: 16,
    following: 17,
    achievements: 25,
  },
}

const achievements = [
  { id: 1, icon: "🏆", date: "January 2024" },
  { id: 2, icon: "🎯", date: "January 2024" },
  { id: 3, icon: "⭐", date: "January 2024" },
  { id: 4, icon: "🏅", date: "January 2024" },
  { id: 5, icon: "🌟", date: "December 2023" },
  { id: 6, icon: "🎮", date: "December 2023" },
  { id: 7, icon: "🎨", date: "December 2023" },
  { id: 8, icon: "📚", date: "December 2023" },
  { id: 9, icon: "💪", date: "November 2023" },
  { id: 10, icon: "🎯", date: "November 2023" },
  { id: 11, icon: "🏆", date: "November 2023" },
  { id: 12, icon: "⭐", date: "November 2023" },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header user={profileUser} />

      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            {/* Profile Info */}
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
                    <img
                      src={profileUser.avatar || "/placeholder.svg"}
                      alt={profileUser.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold">{profileUser.name}</h1>
                    <p className="text-muted-foreground">@{profileUser.username}</p>
                    <p className="text-muted-foreground">Account created {profileUser.dateCreated}</p>
                    <p className="text-muted-foreground">
                      {profileUser.stats.followers} Followers | {profileUser.stats.following} Following |{" "}
                      {profileUser.stats.achievements} Achievements
                    </p>
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

              {/* Achievements Grid */}
              <TabsContent value="achievements" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className="bg-secondary">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="bg-secondary">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4">Celebrities to Follow:</h2>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted" />
                        <span className="text-sm">Celeb #{i + 1}</span>
                      </div>
                      <Button size="sm">Follow</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4">People You Might Know:</h2>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted" />
                        <span className="text-sm">Person #{i + 1}</span>
                      </div>
                      <Button size="sm">Connect</Button>
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

