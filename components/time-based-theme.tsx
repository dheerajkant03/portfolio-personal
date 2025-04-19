"use client"

import { useEffect } from "react"
import { useThemeContext } from "@/context/theme-context"

export default function TimeBasedTheme() {
  const { setTheme } = useThemeContext()

  useEffect(() => {
    // Set theme based on time of day
    const updateThemeBasedOnTime = () => {
      const hour = new Date().getHours()

      if (hour >= 6 && hour < 18) {
        // Daytime: 6 AM - 6 PM
        setTheme("light")
      } else {
        // Nighttime: 6 PM - 6 AM
        setTheme("dark")
      }
    }

    // Initial theme setting
    updateThemeBasedOnTime()

    // Update theme every hour
    const interval = setInterval(updateThemeBasedOnTime, 3600000) // 1 hour

    return () => clearInterval(interval)
  }, [setTheme])

  return null // This component doesn't render anything
}
