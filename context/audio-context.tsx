"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AudioContextType {
  isMuted: boolean
  toggleMute: () => void
  playSound: (sound: "click" | "hover" | "success" | "section") => void
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playSound: () => {},
})

export const useAudioContext = () => useContext(AudioContext)

interface AudioProviderProps {
  children: ReactNode
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load sound effects
      const clickSound = new Audio("/assets/audio/click.mp3")
      const hoverSound = new Audio("/assets/audio/hover.mp3")
      const successSound = new Audio("/assets/audio/success.mp3")
      const sectionSound = new Audio("/assets/audio/section.mp3")

      // Set volumes
      clickSound.volume = 0.2
      hoverSound.volume = 0.1
      successSound.volume = 0.3
      sectionSound.volume = 0.2

      setSounds({
        click: clickSound,
        hover: hoverSound,
        success: successSound,
        section: sectionSound,
      })

      // Check if user has previously set mute preference
      const savedMuteState = localStorage.getItem("isMuted")
      if (savedMuteState !== null) {
        setIsMuted(savedMuteState === "true")
      }
    }
  }, [])

  const toggleMute = () => {
    const newMuteState = !isMuted
    setIsMuted(newMuteState)
    localStorage.setItem("isMuted", newMuteState.toString())
  }

  const playSound = (sound: "click" | "hover" | "success" | "section") => {
    if (!isMuted && sounds[sound]) {
      // Clone the audio to allow overlapping sounds
      const soundClone = sounds[sound].cloneNode() as HTMLAudioElement
      soundClone.play().catch(() => {
        // Ignore errors from browsers that block autoplay
      })
    }
  }

  return <AudioContext.Provider value={{ isMuted, toggleMute, playSound }}>{children}</AudioContext.Provider>
}
