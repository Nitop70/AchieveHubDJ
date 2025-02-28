"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  notifications?: number | boolean
}

const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
  ({ className, notifications, ...props }, ref) => (
    <div className="relative">
      <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full bg-background dark:bg-secondary", className)}
        {...props}
      />
      {notifications && (
        <span
          className={cn(
            "absolute -top-1 -right-1 flex items-center justify-center",
            typeof notifications === "number"
              ? "min-w-[1.25rem] h-5 rounded-full px-1 text-xs bg-red-500 text-white"
              : "w-2 h-2 rounded-full bg-red-500",
          )}
        >
          {typeof notifications === "number" ? notifications : null}
        </span>
      )}
    </div>
  ),
)
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

