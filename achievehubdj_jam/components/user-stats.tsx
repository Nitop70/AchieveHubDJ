import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types/user"

interface UserStatsProps {
  user: User
}

export function UserStats({ user }: UserStatsProps) {
  return (
    <Card className="bg-secondary">
      <CardContent className="p-6">
        <div className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-6">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="font-semibold text-foreground">{user.stats.followers}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{user.stats.following}</div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{user.stats.achievements}</div>
              <div className="text-xs text-muted-foreground">Awards</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

