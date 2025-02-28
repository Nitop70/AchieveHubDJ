import { notFound } from "next/navigation"
import CelebrityAchievements from "@/components/celebrity-achievements"
import type { User } from "@/types/user"

// Sample celebrity data - in a real app, this would come from a database
const celebrities: Record<string, User & { bio?: string }> = {
  rogerfederer: {
    id: "rf1",
    name: "Roger Federer",
    username: "rogerfederer",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lv5BX116P5lDt2iyHRJVNbGiIUOsDp.png",
    stats: {
      followers: 18500000,
      following: 102,
      achievements: 103,
    },
    bio: "20-time Grand Slam champion 🎾 | Olympic Gold Medalist 🥇 | Tennis legend and philanthropist 🎾",
  },
  kendricklamar: {
    id: "kl1",
    name: "Kendrick Lamar",
    username: "kendricklamar",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tvr0Bo3XmB6HmXk4c8dVK5rmrKQfni.png",
    stats: {
      followers: 12300000,
      following: 85,
      achievements: 65,
    },
    bio: "5x Grammy Winner 🏆 | Hip-hop artist and songwriter 🎤 | Cultural icon 🎵",
  },
  michelleobama: {
    id: "mo1",
    name: "Michelle Obama",
    username: "michelleobama",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelle_Obama_2013_official_portrait.jpg/800px-Michelle_Obama_2013_official_portrait.jpg",
    stats: {
      followers: 15700000,
      following: 123,
      achievements: 42,
    },
    bio: "Former First Lady of the United States 🇺🇸 | Bestselling Author 📚 | Advocate for education and healthy living 💪",
  },
}

export default function CelebrityAchievementsPage({ params }: { params: { username: string } }) {
  const user = celebrities[params.username.toLowerCase()]

  if (!user) {
    notFound()
  }

  return <CelebrityAchievements user={user} />
}

