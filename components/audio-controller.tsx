"use client"

import { useEffect, useRef } from "react"
import { useAudioContext } from "@/context/audio-context"

export default function AudioController() {
  const { isMuted } = useAudioContext()
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio elements
    if (typeof window !== "undefined") {
      backgroundAudioRef.current = new Audio("/assets/audio/ambient.mp3")
      backgroundAudioRef.current.loop = true
      backgroundAudioRef.current.volume = 0.1
    }

    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (backgroundAudioRef.current) {
      if (isMuted) {
        backgroundAudioRef.current.pause()
      } else {
        // Only play if user has interacted with the page
        const hasInteracted = localStorage.getItem("hasInteracted")
        if (hasInteracted === "true") {
          backgroundAudioRef.current.play().catch(() => {
            // Autoplay was prevented, we'll try again when user interacts
          })
        }
      }
    }
  }, [isMuted])

  useEffect(() => {
    const handleInteraction = () => {
      localStorage.setItem("hasInteracted", "true")
      if (backgroundAudioRef.current && !isMuted) {
        backgroundAudioRef.current.play().catch(() => {
          // Still couldn't play, might be browser restrictions
        })
      }

      // Remove event listeners after first interaction
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }

    window.addEventListener("click", handleInteraction)
    window.addEventListener("touchstart", handleInteraction)

    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }
  }, [isMuted])

  return null // This component doesn't render anything
}
