"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Experience {
  title: string
  organization: string
  location: string
  period: string
  description: string
  skills: string[]
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const experiences: Experience[] = [
    {
      title: "Media Service Committee Member",
      organization: "IIITD",
      location: "Delhi",
      period: "2022 - Present",
      description:
        "Active member of the Media Service Committee, responsible for photography, videography, and design for campus events. Collaborated with team members to create promotional materials and document important events.",
      skills: ["Event Photography", "Video Production", "Promotional Design"],
    },
    {
      title: "Design Team Lead",
      organization: "College Cultural Festival",
      location: "IIITD",
      period: "2023",
      description:
        "Led a team of designers to create cohesive visual identity for the annual cultural festival. Managed design timelines and ensured consistent branding across all materials.",
      skills: ["Team Leadership", "Brand Design", "Project Management"],
    },
    {
      title: "Photography Workshop Facilitator",
      organization: "Photography Club",
      location: "IIITD",
      period: "2022",
      description:
        "Conducted workshops for beginners on photography basics, composition techniques, and post-processing. Mentored new members and provided feedback on their work.",
      skills: ["Teaching", "Mentorship", "Technical Training"],
    },
    {
      title: "Freelance Designer",
      organization: "Self-employed",
      location: "Remote",
      period: "2021 - Present",
      description:
        "Created visual designs for various clients including presentation decks, social media graphics, and promotional materials. Managed client relationships and delivered projects on tight deadlines.",
      skills: ["Client Management", "Visual Design", "Time Management"],
    },
  ]

  return (
    <section id="experience" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My professional journey and key roles that have shaped my skills and expertise.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden border-l-4 border-l-primary">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="p-6 md:border-r bg-muted/50">
                      <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.organization}</p>

                      <div className="flex items-center text-sm text-muted-foreground mt-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{exp.location}</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <div className="p-6 md:col-span-3">
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
