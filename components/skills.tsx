"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code, PenTool, Film, Music, Figma, Cpu } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAudioContext } from "@/context/audio-context"

interface Skill {
  name: string
  level: number
  icon: React.ReactNode
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const { playSound } = useAudioContext()
  const [activeTab, setActiveTab] = useState("programming")

  const programmingSkills: Skill[] = [
    { name: "C++", level: 85, icon: <Cpu className="h-5 w-5" /> },
    { name: "Java", level: 80, icon: <Cpu className="h-5 w-5" /> },
    { name: "Python", level: 75, icon: <Cpu className="h-5 w-5" /> },
  ]

  const designSkills: Skill[] = [
    { name: "Canva", level: 90, icon: <PenTool className="h-5 w-5" /> },
    { name: "Adobe Photoshop", level: 85, icon: <PenTool className="h-5 w-5" /> },
    { name: "Adobe Illustrator", level: 80, icon: <PenTool className="h-5 w-5" /> },
    { name: "Figma", level: 75, icon: <Figma className="h-5 w-5" /> },
  ]

  const videoSkills: Skill[] = [
    { name: "Adobe Premiere Pro", level: 90, icon: <Film className="h-5 w-5" /> },
    { name: "DaVinci Resolve", level: 85, icon: <Film className="h-5 w-5" /> },
  ]

  const audioSkills: Skill[] = [{ name: "Reaper", level: 80, icon: <Music className="h-5 w-5" /> }]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    playSound("click")
  }

  const renderSkills = (skills: Skill[]) => {
    return skills.map((skill, index) => (
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="p-1.5 rounded-full bg-primary/10 mr-2">{skill.icon}</div>
            <span className="font-medium">{skill.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">{skill.level}%</span>
        </div>
        <Progress value={skill.level} className="h-2" />
      </motion.div>
    ))
  }

  return (
    <section id="skills" ref={ref} className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I've developed a diverse set of technical skills across programming, design, and media production. Here's a
            breakdown of my capabilities in different domains.
          </p>
        </motion.div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <Tabs defaultValue="programming" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 w-full">
              <TabsTrigger value="programming" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden md:inline">Programming</span>
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                <span className="hidden md:inline">Design</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Film className="h-4 w-4" />
                <span className="hidden md:inline">Video</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span className="hidden md:inline">Audio</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="programming" className="mt-0">
                {renderSkills(programmingSkills)}
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                {renderSkills(designSkills)}
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                {renderSkills(videoSkills)}
              </TabsContent>

              <TabsContent value="audio" className="mt-0">
                {renderSkills(audioSkills)}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
