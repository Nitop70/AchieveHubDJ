"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { ImageIcon, LinkIcon, Trophy, Video, Loader2, Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserStats } from "@/components/user-stats"
import { Textarea } from "@/components/ui/textarea"
import type { User } from "@/types/user"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Add this type definition near the top of the file
type FollowingState = {
  [key: string]: boolean
}

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

interface Comment {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  text: string
  timestamp: string
  likes: number
  isLiked: boolean
}

interface Post {
  id: number
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  comments: Comment[]
  isBookmarked: boolean
  shares: number
}

// Sample posts data with enhanced structure
const initialPosts: Post[] = [
  {
    id: 4,
    author: {
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "/placeholder.svg",
    },
    content:
      "Just earned my first Gold Medal in the National Swimming Championship! 🏊‍♀️ Hard work and dedication really do pay off. Thanks to everyone who supported me along the way! 🏆",
    timestamp: "2h ago",
    likes: 24,
    isLiked: false,
    comments: [
      {
        id: "1",
        user: {
          name: "Michael Chen",
          username: "mikechen",
          avatar: "/placeholder.svg",
        },
        text: "Incredible achievement! Congratulations! 🎉",
        timestamp: "1h ago",
        likes: 3,
        isLiked: false,
      },
      {
        id: "2",
        user: {
          name: "Emma Thompson",
          username: "emmathompson",
          avatar: "/placeholder.svg",
        },
        text: "You've inspired me to get back to swimming! 🏊‍♀️",
        timestamp: "30m ago",
        likes: 1,
        isLiked: false,
      },
    ],
    isBookmarked: false,
    shares: 5,
  },
  {
    id: 5,
    author: {
      name: "Alex Rivera",
      username: "alexr",
      avatar: "/placeholder.svg",
    },
    content:
      "Finally completed my Master's degree in Computer Science! 🎓 It's been a long journey, but worth every moment. Ready for new challenges ahead! #Achievement #Education",
    timestamp: "4h ago",
    likes: 42,
    isLiked: false,
    comments: [
      {
        id: "1",
        user: {
          name: "John Doe",
          username: "johndoe",
          avatar: "/placeholder.svg",
        },
        text: "Congratulations! What an amazing accomplishment! 🎉",
        timestamp: "3h ago",
        likes: 5,
        isLiked: true,
      },
    ],
    isBookmarked: false,
    shares: 8,
  },
]

// Add a new array for celebrity posts
const celebrityPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Roger Federer",
      username: "rogerfederer",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lv5BX116P5lDt2iyHRJVNbGiIUOsDp.png",
    },
    content:
      "Just clinched my 9th Wimbledon title! 🎾 The journey never gets old. Thank you to all my fans for the incredible support! #Tennis #Wimbledon #Champion",
    timestamp: "1h ago",
    likes: 245678,
    isLiked: false,
    comments: [
      {
        id: "1",
        user: {
          name: "Rafael Nadal",
          username: "rafaelnadal",
          avatar: "/placeholder.svg",
        },
        text: "Congratulations Roger! Amazing achievement! 👏",
        timestamp: "45m ago",
        likes: 12543,
        isLiked: false,
      },
    ],
    isBookmarked: false,
    shares: 45789,
  },
  {
    id: 2,
    author: {
      name: "Kendrick Lamar",
      username: "kendricklamar",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tvr0Bo3XmB6HmXk4c8dVK5rmrKQfni.png",
    },
    content:
      "Honored to receive my 5th Grammy Award! 🏆 Music is about connecting souls and sharing stories. Grateful for everyone who's been part of this journey. #GrammyAwards #Music",
    timestamp: "3h ago",
    likes: 189432,
    isLiked: false,
    comments: [
      {
        id: "1",
        user: {
          name: "Drake",
          username: "drake",
          avatar: "/placeholder.svg",
        },
        text: "Well deserved brother! 🙌",
        timestamp: "2h ago",
        likes: 8765,
        isLiked: false,
      },
    ],
    isBookmarked: false,
    shares: 32567,
  },
  {
    id: 3,
    author: {
      name: "Michelle Obama",
      username: "michelleobama",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelle_Obama_2013_official_portrait.jpg/800px-Michelle_Obama_2013_official_portrait.jpg",
    },
    content:
      "Thrilled to announce that 'The Light We Carry' has reached 1 million copies sold! 📚 Your support means everything. Together, we're sharing stories that inspire and connect. #TheLightWeCarry #Reading",
    timestamp: "5h ago",
    likes: 156789,
    isLiked: false,
    comments: [
      {
        id: "1",
        user: {
          name: "Oprah Winfrey",
          username: "oprah",
          avatar: "/placeholder.svg",
        },
        text: "Your words continue to inspire millions! Congratulations! 🌟",
        timestamp: "4h ago",
        likes: 9876,
        isLiked: false,
      },
    ],
    isBookmarked: false,
    shares: 28943,
  },
]

// Generate more posts for infinite scroll
const generateMorePosts = (startIndex: number, count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    author: {
      name: `User ${startIndex + i}`,
      username: `user${startIndex + i}`,
      avatar: "/placeholder.svg",
    },
    content: `Achievement unlocked! #${startIndex + i} 🏆`,
    timestamp: `${Math.floor(Math.random() * 24)}h ago`,
    likes: Math.floor(Math.random() * 100),
    isLiked: false,
    comments: [],
    isBookmarked: false,
    shares: Math.floor(Math.random() * 20),
  }))
}

// Update the HomePage component
export default function HomePage() {
  // Add these state variables
  const [followingState, setFollowingState] = useState<FollowingState>({
    rogerfederer: true,
    kendricklamar: true,
    michelleobama: true,
  })
  const [followedPosts, setFollowedPosts] = useState<Post[]>([])
  const [posts, setPosts] = useState(initialPosts)
  const [isLoading, setIsLoading] = useState(false)
  const { ref: loadMoreRef, inView } = useInView()
  const [newPost, setNewPost] = useState("")
  const [showComments, setShowComments] = useState<Record<number, boolean>>({})
  const [newComments, setNewComments] = useState<Record<number, string>>({})

  // Add this effect to update followed posts when following state changes
  useEffect(() => {
    // Filter celebrity posts to only show those from followed users
    const followedCelebrityPosts = celebrityPosts.filter((post) => followingState[post.author.username])
    setFollowedPosts(followedCelebrityPosts)
  }, [followingState])

  // Load more posts when scrolling to the bottom
  useEffect(() => {
    const loadMore = async () => {
      if (inView && !isLoading) {
        setIsLoading(true)
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPosts((prevPosts) => [...prevPosts, ...generateMorePosts(prevPosts.length + 1, 3)])
        setIsLoading(false)
      }
    }

    loadMore()
  }, [inView, isLoading])

  // Add this function to handle following/unfollowing
  const handleFollow = (username: string) => {
    setFollowingState((prev) => ({
      ...prev,
      [username]: !prev[username],
    }))
  }

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now(),
      author: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      comments: [],
      isBookmarked: false,
      shares: 0,
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleCommentLike = (postId: number, commentId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                  isLiked: !comment.isLiked,
                }
              }
              return comment
            }),
          }
        }
        return post
      }),
    )
  }

  const handleBookmark = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked,
          }
        }
        return post
      }),
    )
  }

  const handleAddComment = (postId: number) => {
    const commentText = newComments[postId]
    if (!commentText?.trim()) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                user: {
                  name: currentUser.name,
                  username: currentUser.username,
                  avatar: currentUser.avatar,
                },
                text: commentText,
                timestamp: "Just now",
                likes: 0,
                isLiked: false,
              },
            ],
          }
        }
        return post
      }),
    )

    setNewComments({ ...newComments, [postId]: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} />

      <main className="pt-5">
        <div className="container">
          <div className="grid gap-5 grid-cols-[240px_1fr_280px]">
            {/* Left Sidebar - Sticky */}
            <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto pb-5">
              <div className="space-y-6">
                <UserStats user={currentUser} />
                <Card>
                  <CardHeader className="font-semibold">Last Achievement</CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="text-center">
                      <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                      <h3 className="font-semibold">State Chess Champion</h3>
                      <p className="text-sm text-muted-foreground">1st Place in California State Chess Championship</p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">🏆 1st Place</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          👥 128 Participants
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Earned February 2024</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => (window.location.href = "/achievements")}
                    >
                      View Achievement Log
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content - Scrollable */}
            <div className="min-h-[calc(100vh-73px)] pt-5">
              <Tabs defaultValue="for-you" className="w-full">
                <div className="sticky top-[56px] z-20 bg-background border-b">
                  <TabsList className="w-full">
                    <TabsTrigger
                      value="for-you"
                      className="flex-1 data-[state=active]:bg-[#6366F1] data-[state=active]:text-primary-foreground"
                    >
                      For You
                    </TabsTrigger>
                    <TabsTrigger
                      value="following"
                      className="flex-1 data-[state=active]:bg-[#6366F1] data-[state=active]:text-primary-foreground"
                    >
                      Following
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="for-you" className="mt-6 space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <form onSubmit={handlePostSubmit}>
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" alt="Profile" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <Textarea
                            placeholder="Share your latest achievement!"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            className="flex-1 resize-none"
                            rows={2}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex gap-2">
                            <Button type="button" variant="ghost" size="sm">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Image
                            </Button>
                            <Button type="button" variant="ghost" size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Video
                            </Button>
                            <Button type="button" variant="ghost" size="sm">
                              <LinkIcon className="h-4 w-4 mr-2" />
                              Link
                            </Button>
                          </div>
                          <Button type="submit" disabled={!newPost.trim()}>
                            Post
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Posts Feed */}
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader className="flex-row items-start space-y-0">
                        <div className="flex gap-4 w-full">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">{post.author.name}</p>
                                <p className="text-sm text-muted-foreground">@{post.author.username}</p>
                              </div>
                              <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                            </div>
                            <p className="mt-2 text-base whitespace-pre-wrap">{post.content}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <Separator />
                      <CardFooter className="p-4 flex flex-col gap-4">
                        <div className="flex items-center justify-between w-full">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn("flex gap-2 text-base hover:text-red-500", post.isLiked && "text-red-500")}
                            onClick={() => handleLike(post.id)}
                          >
                            <Heart className={cn("h-5 w-5", post.isLiked && "fill-current")} />
                            <span>{post.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex gap-2 text-base hover:text-primary"
                            onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                          >
                            <MessageCircle className="h-5 w-5" />
                            <span>{post.comments.length}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex gap-2 text-base hover:text-primary">
                            <Share2 className="h-5 w-5" />
                            <span>{post.shares}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "flex gap-2 text-base hover:text-yellow-500",
                              post.isBookmarked && "text-yellow-500",
                            )}
                            onClick={() => handleBookmark(post.id)}
                          >
                            <Bookmark className={cn("h-5 w-5", post.isBookmarked && "fill-current")} />
                          </Button>
                        </div>

                        {/* Comments Section */}
                        {showComments[post.id] && (
                          <div className="w-full space-y-4">
                            <Separator />
                            {/* Comment Input */}
                            <div className="flex gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex gap-2">
                                <Input
                                  placeholder="Write a comment..."
                                  value={newComments[post.id] || ""}
                                  onChange={(e) =>
                                    setNewComments({
                                      ...newComments,
                                      [post.id]: e.target.value,
                                    })
                                  }
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!newComments[post.id]?.trim()}
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-4">
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="flex gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-1">
                                    <div className="bg-muted rounded-lg p-3">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <span className="font-semibold">{comment.user.name}</span>
                                          <span className="text-sm text-muted-foreground ml-2">
                                            @{comment.user.username}
                                          </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                      </div>
                                      <p className="mt-1">{comment.text}</p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={cn(
                                        "flex gap-1 text-sm hover:text-red-500",
                                        comment.isLiked && "text-red-500",
                                      )}
                                      onClick={() => handleCommentLike(post.id, comment.id)}
                                    >
                                      <Heart className={cn("h-4 w-4", comment.isLiked && "fill-current")} />
                                      <span>{comment.likes}</span>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}

                  {/* Loading indicator */}
                  <div ref={loadMoreRef} className="flex justify-center items-center py-4">
                    {isLoading && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading more posts...</span>
                      </div>
                    )}
                  </div>
                </TabsContent>
                {/* Update the Following tab content */}
                <TabsContent value="following" className="mt-6">
                  {followedPosts.length > 0 ? (
                    <div className="space-y-4">
                      {followedPosts.map((post) => (
                        <Card key={post.id} className="bg-secondary">
                          <CardHeader className="flex-row items-start space-y-0">
                            <div className="flex gap-4 w-full">
                              <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-semibold">{post.author.name}</p>
                                    <p className="text-sm text-muted-foreground">@{post.author.username}</p>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                                </div>
                                <p className="mt-2 text-base whitespace-pre-wrap">{post.content}</p>
                              </div>
                            </div>
                          </CardHeader>
                          <Separator />
                          <CardFooter className="p-4 flex flex-col gap-4">
                            <div className="flex items-center justify-between w-full">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "flex gap-2 text-base hover:text-red-500",
                                  post.isLiked && "text-red-500",
                                )}
                                onClick={() => handleLike(post.id)}
                              >
                                <Heart className={cn("h-5 w-5", post.isLiked && "fill-current")} />
                                <span>{post.likes}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex gap-2 text-base hover:text-primary"
                                onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                              >
                                <MessageCircle className="h-5 w-5" />
                                <span>{post.comments.length}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="flex gap-2 text-base hover:text-primary">
                                <Share2 className="h-5 w-5" />
                                <span>{post.shares}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "flex gap-2 text-base hover:text-yellow-500",
                                  post.isBookmarked && "text-yellow-500",
                                )}
                                onClick={() => handleBookmark(post.id)}
                              >
                                <Bookmark className={cn("h-5 w-5", post.isBookmarked && "fill-current")} />
                              </Button>
                            </div>

                            {/* Comments Section */}
                            {showComments[post.id] && (
                              <div className="w-full space-y-4">
                                <Separator />
                                {/* Comment Input */}
                                <div className="flex gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 flex gap-2">
                                    <Input
                                      placeholder="Write a comment..."
                                      value={newComments[post.id] || ""}
                                      onChange={(e) =>
                                        setNewComments({
                                          ...newComments,
                                          [post.id]: e.target.value,
                                        })
                                      }
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => handleAddComment(post.id)}
                                      disabled={!newComments[post.id]?.trim()}
                                    >
                                      Reply
                                    </Button>
                                  </div>
                                </div>

                                {/* Comments List */}
                                <div className="space-y-4">
                                  {post.comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 space-y-1">
                                        <div className="bg-muted rounded-lg p-3">
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <span className="font-semibold">{comment.user.name}</span>
                                              <span className="text-sm text-muted-foreground ml-2">
                                                @{comment.user.username}
                                              </span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                          </div>
                                          <p className="mt-1">{comment.text}</p>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className={cn(
                                            "flex gap-1 text-sm hover:text-red-500",
                                            comment.isLiked && "text-red-500",
                                          )}
                                          onClick={() => handleCommentLike(post.id, comment.id)}
                                        >
                                          <Heart className={cn("h-4 w-4", comment.isLiked && "fill-current")} />
                                          <span>{comment.likes}</span>
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Follow some users to see their posts here!</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar - Sticky */}
            <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto pb-5">
              <div className="space-y-4">
                {/* Update the Celebrities to Follow section in the right sidebar */}
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
                      ].map((celeb) => (
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
                            <Button
                              size="sm"
                              className="h-8 px-3 text-xs"
                              variant={followingState[celeb.username] ? "outline" : "default"}
                              onClick={(e) => {
                                e.preventDefault()
                                handleFollow(celeb.username)
                              }}
                            >
                              {followingState[celeb.username] ? "Following" : "Follow"}
                            </Button>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

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
                            <Button size="sm" className="h-8 px-3 text-xs" onClick={(e) => e.preventDefault()}>
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
          </div>
        </div>
      </main>
    </div>
  )
}

