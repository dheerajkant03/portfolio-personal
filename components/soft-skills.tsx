"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Lightbulb, MessageSquare, Clock, Target, Puzzle, Briefcase, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAudioContext } from "@/context/audio-context"

interface SoftSkill {
  title: string
  description: string
  icon: React.ReactNode
}

export default function SoftSkills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const { playSound } = useAudioContext()

  const softSkills: SoftSkill[] = [
    {
      title: "Creativity",
      description: "Bringing innovative ideas and unique perspectives to design and media projects.",
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
    },
    {
      title: "Communication",
      description: "Effectively conveying ideas and collaborating with team members and stakeholders.",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
      title: "Teamwork",
      description: "Working collaboratively in the media service committee to achieve common goals.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Time Management",
      description: "Efficiently balancing academic responsibilities with media production commitments.",
      icon: <Clock className="h-10 w-10 text-primary" />,
    },
    {
      title: "Problem Solving",
      description: "Finding creative solutions to technical and design challenges in projects.",
      icon: <Puzzle className="h-10 w-10 text-primary" />,
    },
    {
      title: "Attention to Detail",
      description: "Ensuring precision and quality in design, photography, and video production.",
      icon: <Target className="h-10 w-10 text-primary" />,
    },
    {
      title: "Adaptability",
      description: "Quickly learning new tools and techniques to stay current with industry trends.",
      icon: <Zap className="h-10 w-10 text-primary" />,
    },
    {
      title: "Professionalism",
      description: "Maintaining high standards of work ethic and reliability in all projects.",
      icon: <Briefcase className="h-10 w-10 text-primary" />,
    },
  ]

  return (
    <section id="soft-skills" ref={ref} className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Soft Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Beyond technical abilities, these interpersonal and professional skills help me collaborate effectively and
            deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => playSound("hover")}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
