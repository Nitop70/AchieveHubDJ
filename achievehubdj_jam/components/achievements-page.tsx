"use client"

import { useState, type FormEvent, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Trophy,
  Medal,
  Award,
  DollarSign,
  Target,
  Crown,
  Scroll,
  Star,
  Plus,
  X,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react"
import type { User } from "@/types/user"
import type { JSX } from "react/jsx-runtime"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

type CategoryType = {
  id: string
  name: string
  icon: JSX.Element
  color: string
  isCustom?: boolean
}

type Achievement = {
  id: string
  title: string
  description: string
  image: string
  categoryId: string
  date: string
  isPrivate: boolean
  details: {
    rank?: string
    prizeAmount?: number
    issuer?: string
    competition?: string
    participants?: number
  }
}

// Default categories
const defaultCategories: CategoryType[] = [
  {
    id: "trophies",
    name: "Trophies",
    icon: <Trophy className="h-5 w-5" />,
    color: "text-yellow-500",
  },
  {
    id: "certificates",
    name: "Certificates",
    icon: <Scroll className="h-5 w-5" />,
    color: "text-blue-500",
  },
  {
    id: "medals",
    name: "Medals",
    icon: <Medal className="h-5 w-5" />,
    color: "text-purple-500",
  },
  {
    id: "cash",
    name: "Cash Prizes",
    icon: <DollarSign className="h-5 w-5" />,
    color: "text-green-500",
  },
  {
    id: "awards",
    name: "Special Awards",
    icon: <Award className="h-5 w-5" />,
    color: "text-red-500",
  },
]

const achievements: Achievement[] = [
  {
    id: "1",
    title: "National Chess Championship",
    description: "First place in the national chess tournament",
    image: "/placeholder.svg?height=300&width=400",
    categoryId: "trophies",
    date: "February 2024",
    isPrivate: false,
    details: {
      rank: "1st Place",
      prizeAmount: 5000,
      competition: "National Chess Championship 2024",
      participants: 128,
    },
  },
  {
    id: "2",
    title: "Web Development Certification",
    description: "Advanced certification in full-stack development",
    image: "/placeholder.svg?height=300&width=400",
    categoryId: "certificates",
    date: "January 2024",
    isPrivate: false,
    details: {
      issuer: "Tech Academy",
    },
  },
  {
    id: "3",
    title: "Hackathon Winner",
    description: "First place in the Global Tech Hackathon",
    image: "/placeholder.svg?height=300&width=400",
    categoryId: "cash",
    date: "December 2023",
    isPrivate: false,
    details: {
      rank: "1st Place",
      prizeAmount: 10000,
      competition: "Global Tech Hackathon 2023",
      participants: 500,
    },
  },
]

// Generate more achievements for infinite scroll
const generateMoreAchievements = (startIndex: number, count: number): Achievement[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${startIndex + i}`,
    title: `Achievement ${startIndex + i}`,
    description: "Generated achievement for infinite scroll",
    image: "/placeholder.svg?height=300&width=400",
    categoryId: defaultCategories[Math.floor(Math.random() * defaultCategories.length)].id,
    date: "March 2024",
    isPrivate: false,
    details: {
      rank: "Generated",
      prizeAmount: Math.floor(Math.random() * 1000),
      participants: Math.floor(Math.random() * 100),
    },
  }))
}

export default function AchievementsPage() {
  const [isAddingAchievement, setIsAddingAchievement] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [customCategories, setCustomCategories] = useState<CategoryType[]>([])
  const [newCategoryName, setNewCategoryName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [displayedAchievements, setDisplayedAchievements] = useState(achievements)
  const { ref: loadMoreRef, inView } = useInView()

  const allCategories = [...defaultCategories, ...customCategories]

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    image: null as File | null,
    prize: "",
    rank: "",
    participants: "",
  })

  // Load more achievements when scrolling to the bottom
  useEffect(() => {
    const loadMore = async () => {
      if (inView && !isLoading) {
        setIsLoading(true)
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const newAchievements = generateMoreAchievements(displayedAchievements.length, 6)
        setDisplayedAchievements((prev) => [...prev, ...newAchievements])
        setIsLoading(false)
      }
    }

    loadMore()
  }, [inView, isLoading, displayedAchievements.length])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.categoryId) return
    console.log("Form submitted:", formData)
    setIsAddingAchievement(false)
    setFormData({
      title: "",
      categoryId: "",
      description: "",
      image: null,
      prize: "",
      rank: "",
      participants: "",
    })
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return
    const newCategory: CategoryType = {
      id: `custom-${Date.now()}`,
      name: newCategoryName,
      icon: <Star className="h-5 w-5" />,
      color: "text-primary",
      isCustom: true,
    }
    setCustomCategories([...customCategories, newCategory])
    setNewCategoryName("")
    setIsAddingCategory(false)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCustomCategories(customCategories.filter((cat) => cat.id !== categoryId))
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
    }
  }

  const filteredAchievements = selectedCategory
    ? displayedAchievements.filter((achievement) => achievement.categoryId === selectedCategory)
    : displayedAchievements

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} />

      <main className="py-5">
        <div className="container">
          <div>
            {/* Main Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    Trophy Case
                  </h1>
                  <p className="text-muted-foreground">Showcase your achievements, awards, and recognition</p>
                </div>
                <Button size="lg" onClick={() => setIsAddingAchievement(true)}>
                  Add Achievement
                </Button>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-full"
                >
                  All
                </Button>
                {allCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full flex items-center gap-2 ${
                      selectedCategory === category.id ? "" : category.color
                    }`}
                  >
                    {category.icon}
                    {category.name}
                    {category.isCustom && (
                      <X
                        className="h-4 w-4 ml-1 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteCategory(category.id)
                        }}
                      />
                    )}
                  </Button>
                ))}
                <Button variant="outline" className="rounded-full" onClick={() => setIsAddingCategory(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>

              {/* Achievement Grid with Infinite Scroll */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredAchievements.map((achievement) => {
                  const category = allCategories.find((cat) => cat.id === achievement.categoryId)
                  return (
                    <Card
                      key={achievement.id}
                      className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={achievement.image || "/placeholder.svg"}
                          alt={achievement.title}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4">
                          {category && <div className={category.color}>{category.icon}</div>}
                        </div>
                      </div>
                      <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                          <CardTitle>{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 -mt-1"
                                onClick={(e) => {
                                  e.preventDefault()
                                  // In a real app, this would update the backend
                                  achievement.isPrivate = !achievement.isPrivate
                                }}
                              >
                                {achievement.isPrivate ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{achievement.isPrivate ? "Make achievement public" : "Make achievement private"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          {achievement.details.rank && (
                            <div className="flex items-center gap-2">
                              <Crown className="h-4 w-4 text-yellow-500" />
                              <span>{achievement.details.rank}</span>
                            </div>
                          )}
                          {achievement.details.prizeAmount && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-500" />
                              <span>${achievement.details.prizeAmount.toLocaleString()}</span>
                            </div>
                          )}
                          {achievement.details.participants && (
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-purple-500" />
                              <span>Competed against {achievement.details.participants} participants</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>{achievement.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Loading indicator */}
              <div ref={loadMoreRef} className="flex justify-center items-center py-8">
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading more achievements...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Achievement Dialog */}
      <Dialog open={isAddingAchievement} onOpenChange={setIsAddingAchievement}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Achievement</DialogTitle>
              <DialogDescription>
                Share your latest victory, certification, or award. Fields marked with * are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  Achievement Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., First Place in Chess Tournament"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {allCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your achievement"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">Additional Details</Label>
                <Input
                  id="prize"
                  placeholder="Prize Amount (if applicable)"
                  type="number"
                  value={formData.prize}
                  onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                />
                <Input
                  id="rank"
                  placeholder="Rank/Position (if applicable)"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                />
                <Input
                  id="participants"
                  placeholder="Number of Participants"
                  type="number"
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingAchievement(false)
                  setFormData({
                    title: "",
                    categoryId: "",
                    description: "",
                    image: null,
                    prize: "",
                    rank: "",
                    participants: "",
                  })
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Add to Trophy Case</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a custom category to organize your achievements.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                placeholder="e.g., Academic Awards"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingCategory(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

