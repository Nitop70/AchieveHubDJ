import { notFound } from "next/navigation"
import ProfilePage from "@/components/profile-page"
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
  elonmusk: {
    id: "em1",
    name: "Elon Musk",
    username: "elonmusk",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    stats: {
      followers: 25800000,
      following: 89,
      achievements: 89,
    },
    bio: "Tech Entrepreneur 💡 | Space Explorer 🚀 | CEO of Tesla & SpaceX",
  },
  taylorswift: {
    id: "ts1",
    name: "Taylor Swift",
    username: "taylorswift",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/800px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png",
    stats: {
      followers: 33200000,
      following: 115,
      achievements: 95,
    },
    bio: "13x Grammy Winner 🏆 | Singer-Songwriter 🎸 | Record Breaker",
  },
  cristiano: {
    id: "cr1",
    name: "Cristiano Ronaldo",
    username: "cristiano",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/800px-Cristiano_Ronaldo_2018.jpg",
    stats: {
      followers: 42100000,
      following: 95,
      achievements: 110,
    },
    bio: "5x Ballon d'Or Winner ⚽ | Football Legend 🏆 | CR7",
  },
  malala: {
    id: "my1",
    name: "Malala Yousafzai",
    username: "malala",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Malala_Yousafzai_at_Girl_Summit_2014.jpg/800px-Malala_Yousafzai_at_Girl_Summit_2014.jpg",
    stats: {
      followers: 8900000,
      following: 72,
      achievements: 38,
    },
    bio: "Nobel Peace Prize Winner 🕊️ | Education Activist 📚 | Youngest Nobel Laureate",
  },
  lewishamilton: {
    id: "lh1",
    name: "Lewis Hamilton",
    username: "lewishamilton",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg/800px-Lewis_Hamilton_2016_Malaysia_2.jpg",
    stats: {
      followers: 15400000,
      following: 108,
      achievements: 82,
    },
    bio: "7x F1 World Champion 🏎️ | Racing Legend 🏆 | Activist for Change",
  },
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const user = celebrities[params.username.toLowerCase()]

  if (!user) {
    notFound()
  }

  return <ProfilePage user={user} isCurrentUser={false} />
}

