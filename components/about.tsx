"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Camera, Code, Palette, Tv, Users, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAudioContext } from "@/context/audio-context"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const { playSound } = useAudioContext()

  useEffect(() => {
    if (isInView) {
      playSound("section")
    }
  }, [isInView, playSound])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="about" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm a 3rd year B-Tech student at IIITD with a passion for design and media production. My journey combines
            technical skills with creative expression through various mediums.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div custom={0} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 mr-3">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Design Enthusiast</h3>
                </div>
                <p className="text-muted-foreground">
                  I create visually appealing PPT designs and have a keen eye for aesthetics. My design philosophy
                  focuses on clean, functional, and impactful visuals that effectively communicate ideas.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={1} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 mr-3">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Photography & Videography</h3>
                </div>
                <p className="text-muted-foreground">
                  I have a passion for capturing moments through photography and creating compelling video content. I
                  enjoy the entire process from conceptualization and shooting to editing and final production.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={2} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 mr-3">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Development</h3>
                </div>
                <p className="text-muted-foreground">
                  I'm proficient in multiple programming languages including C++, Java, and Python, allowing me to bring
                  technical solutions to creative problems and build interactive digital experiences.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={3} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 mr-3">
                    <Tv className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Media Production</h3>
                </div>
                <p className="text-muted-foreground">
                  Production is my niche. I work with professional tools like Adobe Premiere Pro, DaVinci Resolve, and
                  Reaper to create polished media content that engages audiences and tells compelling stories.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={4} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 mr-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Campus Involvement</h3>
                </div>
                <p className="text-muted-foreground">
                  I'm actively involved in the Media Service Committee at IIITD, where I contribute to various campus
                  events and initiatives through my media skills, collaborating with diverse teams to create impactful
                  content.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={5} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 mr-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Academic Excellence</h3>
                </div>
                <p className="text-muted-foreground">
                  As a 3rd year B-Tech student, I balance my creative pursuits with academic rigor. I apply analytical
                  thinking and problem-solving skills from my technical education to enhance my creative projects and
                  design work.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
