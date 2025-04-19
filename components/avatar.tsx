"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudioContext } from "@/context/audio-context"
import { useThemeContext } from "@/context/theme-context"

interface Message {
  text: string
  type: "greeting" | "navigation" | "time" | "info"
}

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const { isMuted, toggleMute } = useAudioContext()
  const { theme } = useThemeContext()

  const messages: Message[] = [
    { text: "Hi there! I'm Dheeraj's virtual assistant. How can I help you today?", type: "greeting" },
    { text: "You can explore Dheeraj's projects in the Projects section.", type: "navigation" },
    { text: "Dheeraj is a design enthusiast and media production specialist.", type: "info" },
  ]

  const timeBasedMessages: Message[] = [
    { text: "Good morning! Ready to explore Dheeraj's portfolio?", type: "time" },
    { text: "Good afternoon! Thanks for visiting Dheeraj's portfolio.", type: "time" },
    { text: "Good evening! Discover Dheeraj's creative work.", type: "time" },
  ]

  useEffect(() => {
    if (isOpen) {
      const hour = new Date().getHours()
      let timeMessage

      if (hour < 12) {
        timeMessage = timeBasedMessages[0]
      } else if (hour < 18) {
        timeMessage = timeBasedMessages[1]
      } else {
        timeMessage = timeBasedMessages[2]
      }

      setIsTyping(true)
      setTimeout(() => {
        setCurrentMessage(timeMessage)
        setIsTyping(false)
      }, 1500)
    } else {
      setCurrentMessage(null)
    }
  }, [isOpen])

  const handleNavigationClick = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const getRandomMessage = () => {
    setIsTyping(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * messages.length)
      setCurrentMessage(messages[randomIndex])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="mb-4 w-72 rounded-lg shadow-lg bg-card border"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">Virtual Assistant</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 h-64 overflow-y-auto" ref={messagesRef}>
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
                    D
                  </div>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    {isTyping ? (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    ) : (
                      currentMessage?.text
                    )}
                  </div>
                </div>

                {!isTyping && currentMessage && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleNavigationClick("projects")}>
                      View Projects
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleNavigationClick("skills")}>
                      See Skills
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleNavigationClick("about")}>
                      About Me
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleNavigationClick("contact")}>
                      Contact
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <Button variant="secondary" className="w-full" onClick={getRandomMessage}>
                  Ask for help
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
            theme === "dark" ? "bg-primary" : "bg-primary"
          }`}
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </motion.button>
      </div>
    </>
  )
}
