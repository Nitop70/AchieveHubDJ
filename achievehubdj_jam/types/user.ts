export interface UserStats {
  followers: number
  following: number
  achievements: number
}

export type StatusType = "online" | "idle" | "dnd" | "invisible"

export interface UserStatus {
  type: StatusType
  emoji?: string
  text?: string
}

export interface User {
  id: string
  name: string
  username: string
  avatar: string
  stats: UserStats
  status?: UserStatus
}

