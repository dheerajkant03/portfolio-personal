"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Camera, Code, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudioContext } from "@/context/audio-context"
import { useThemeContext } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  const { playSound } = useAudioContext()
  const { theme } = useThemeContext()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleExploreClick = () => {
    playSound("click")
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative h-screen w-full flex flex-col items-center justify-center overflow-hidden",
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100",
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 opacity-20 transform transition-transform duration-500"
          style={{
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
          }}
        >
          <Camera size={120} className="text-primary" />
        </div>
        <div
          className="absolute top-1/3 right-1/4 opacity-20 transform transition-transform duration-500"
          style={{
            transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * 20}px)`,
          }}
        >
          <Code size={100} className="text-primary" />
        </div>
        <div
          className="absolute bottom-1/4 left-1/3 opacity-20 transform transition-transform duration-500"
          style={{
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * -20}px)`,
          }}
        >
          <Palette size={80} className="text-primary" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4 max-w-4xl"
      >
        <motion.div
          className="mb-6 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-glow p-2">Dheeraj Kant Singh</h1>
        </motion.div>

        <motion.div
          className="text-xl md:text-2xl text-muted-foreground mb-8 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TypeAnimation
            sequence={[
              "Design Enthusiast",
              1000,
              "Photographer",
              1000,
              "Videographer",
              1000,
              "Developer",
              1000,
              "Media Producer",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
            className="font-medium text-foreground"
          />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A creative professional combining technical expertise with artistic vision to craft compelling digital
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" onClick={handleExploreClick} className="group bg-primary hover:bg-primary/90">
            Explore My Work
            <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="animate-bounce"
        >
          <ArrowDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  )
}
