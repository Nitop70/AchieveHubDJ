"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      // In a real app, this would integrate with your authentication service
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
      router.push("/")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-3">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-[#6366F1]" />
              <span className="text-3xl font-bold">
                Achieve<span className="text-[#6366F1]">Hub</span>
              </span>
            </div>
          </div>
          <div className="text-center space-y-1.5">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button variant="outline" disabled={isLoading} onClick={handleGoogleLogin} className="bg-background">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}
              Sign in with Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Button disabled className="w-full" variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button disabled className="w-full" variant="outline">
              <Icons.twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

