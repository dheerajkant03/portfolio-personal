"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Visitor {
  id: string
  name: string
  avatar: string
  section: string
  timestamp: number
}

export default function SocialPresence() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [currentSection, setCurrentSection] = useState<string>("home")

  // Simulate other visitors
  useEffect(() => {
    const names = ["Aarav", "Priya", "Rahul", "Neha", "Vikram"]
    const sections = ["home", "about", "skills", "projects", "contact"]

    // Generate random visitors
    const randomVisitors = Array.from({ length: 3 }, (_, i) => ({
      id: `visitor-${i}`,
      name: names[Math.floor(Math.random() * names.length)],
      avatar: `/placeholder.svg?height=40&width=40`,
      section: sections[Math.floor(Math.random() * sections.length)],
      timestamp: Date.now() - Math.floor(Math.random() * 300000), // Random time in the last 5 minutes
    }))

    setVisitors(randomVisitors)

    // Simulate visitors changing sections
    const interval = setInterval(() => {
      setVisitors((prev) =>
        prev.map((visitor) => {
          if (Math.random() > 0.7) {
            // 30% chance to change section
            return {
              ...visitor,
              section: sections[Math.floor(Math.random() * sections.length)],
              timestamp: Date.now(),
            }
          }
          return visitor
        }),
      )
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  // Track current user's section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const currentPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()

          if (currentPosition >= top && currentPosition <= bottom) {
            if (currentSection !== section) {
              setCurrentSection(section)
            }
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentSection])

  // Add current user to local storage for social presence
  useEffect(() => {
    const userId = localStorage.getItem("userId") || `user-${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem("userId", userId)

    // Update current user's section
    localStorage.setItem("currentSection", currentSection)
    localStorage.setItem("timestamp", Date.now().toString())

    // This would typically be handled by a backend service
    // For this demo, we're just using local storage
  }, [currentSection])

  // Get time ago string
  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-full p-2 shadow-lg cursor-pointer"
            >
              <Users className="h-6 w-6 text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {visitors.length}
              </span>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="top" className="w-64 p-0">
            <div className="p-4">
              <h3 className="font-semibold mb-2">Currently Viewing</h3>
              <div className="space-y-3">
                <AnimatePresence>
                  {visitors.map((visitor) => (
                    <motion.div
                      key={visitor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={visitor.avatar || "/placeholder.svg"} alt={visitor.name} />
                        <AvatarFallback>{visitor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{visitor.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Viewing: {visitor.section.charAt(0).toUpperCase() + visitor.section.slice(1)}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">{getTimeAgo(visitor.timestamp)}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
