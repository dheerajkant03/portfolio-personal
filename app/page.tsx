import { Suspense } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Avatar from "@/components/avatar"
import SocialPresence from "@/components/social-presence"
import AudioController from "@/components/audio-controller"
import TimeBasedTheme from "@/components/time-based-theme"
import Loading from "@/components/loading"
import DynamicBackground from "@/components/dynamic-background"
import SoftSkills from "@/components/soft-skills"
import Experience from "@/components/experience"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <TimeBasedTheme />
      <AudioController />
      <Suspense fallback={<Loading />}>
        <DynamicBackground className="min-h-screen">
          <Hero />
          <About />
          <Skills />
          <SoftSkills />
          <Experience />
          <Projects />
          <Contact />
        </DynamicBackground>
      </Suspense>
      <Avatar />
      <SocialPresence />
    </main>
  )
}
