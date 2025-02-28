"use client"
import { Check, Moon, MinusCircle, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User, StatusType, UserStatus } from "@/types/user"
import { useState, useEffect } from "react"

interface StatusSelectorProps {
  user: User
}

const statusConfig = {
  online: {
    label: "Online",
    color: "bg-green-500",
    icon: Circle,
  },
  idle: {
    label: "Idle",
    color: "bg-yellow-500",
    icon: Moon,
  },
  dnd: {
    label: "Do Not Disturb",
    color: "bg-red-500",
    icon: MinusCircle,
  },
  invisible: {
    label: "Invisible",
    color: "bg-gray-500",
    icon: Circle,
  },
}

export function StatusSelector({ user }: StatusSelectorProps) {
  const [status, setStatus] = useState<UserStatus>({ type: "online" })

  // Simulate auto-idle after 5 minutes of inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      if (status.type !== "dnd" && status.type !== "invisible") {
        inactivityTimer = setTimeout(
          () => {
            setStatus((prev) => ({ ...prev, type: "idle" }))
          },
          5 * 60 * 1000,
        ) // 5 minutes
      }
    }

    const handleActivity = () => {
      if (status.type === "idle") {
        setStatus((prev) => ({ ...prev, type: "online" }))
      }
      resetTimer()
    }

    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)

    resetTimer()

    return () => {
      clearTimeout(inactivityTimer)
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
    }
  }, [status.type])

  const handleStatusChange = (newStatus: StatusType) => {
    setStatus({ type: newStatus })
  }

  const StatusIcon = statusConfig[status.type].icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <StatusIcon className={`h-4 w-4 ${status.type === "invisible" ? "fill-gray-500" : ""}`} />
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
              statusConfig[status.type].color
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background" align="end">
        <DropdownMenuGroup>
          {Object.entries(statusConfig).map(([key, config]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleStatusChange(key as StatusType)}
              className="flex items-center gap-2 bg-background hover:bg-secondary focus:bg-secondary"
            >
              <div className="flex items-center gap-2 flex-1">
                <config.icon className={`h-4 w-4 ${key === "invisible" ? "fill-gray-500" : ""}`} />
                {config.label}
              </div>
              {status.type === key && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

