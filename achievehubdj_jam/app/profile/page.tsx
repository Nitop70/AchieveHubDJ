import ProfilePage from "@/components/profile-page"

// Default user data
const defaultUser = {
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

export default function Page() {
  return <ProfilePage user={defaultUser} isCurrentUser={true} />
}

