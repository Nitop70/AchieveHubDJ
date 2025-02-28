import Link from "next/link"
import { Bell, Home, MessageCircle, Search, Trophy, Users2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserMenu } from "@/components/user-menu"
import { StatusSelector } from "@/components/status-selector"
import type { User } from "@/types/user"

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center h-14">
        {/* Left section with logo and search */}
        <div className="w-[240px] flex items-center gap-4">
          <Link href="/" className="font-bold hover:opacity-80 transition-opacity" aria-label="Go to home page">
            <span className="text-xl">
              Achieve<span className="text-[#6366F1]">Hub</span>
            </span>
          </Link>
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-[120px] pl-8" />
          </div>
        </div>

        {/* Center section with navigation icons */}
        <div className="flex-1 flex justify-center">
          <nav className="hidden sm:flex items-center gap-12 px-4">
            <Link href="/" className="flex flex-col items-center hover:text-primary transition-colors">
              <Home className="h-7 w-7" />
              <span className="sr-only">Home</span>
            </Link>
            <Link href="/achievements" className="flex flex-col items-center hover:text-primary transition-colors">
              <Trophy className="h-7 w-7" />
              <span className="sr-only">Achievements</span>
            </Link>
            <Link href="/friends" className="flex flex-col items-center hover:text-primary transition-colors">
              <Users2 className="h-7 w-7" />
              <span className="sr-only">Friends</span>
            </Link>
            <Link href="/messages" className="flex flex-col items-center hover:text-primary transition-colors">
              <MessageCircle className="h-7 w-7" />
              <span className="sr-only">Messages</span>
            </Link>
          </nav>
        </div>

        {/* Right section with notifications and user menu */}
        <div className="w-[240px] flex items-center justify-end gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <StatusSelector user={user} />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}

