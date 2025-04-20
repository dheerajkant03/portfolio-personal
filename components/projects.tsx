"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Camera, Code, Film, Palette, ExternalLink, QrCode, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAudioContext } from "@/context/audio-context"
import { cn } from "@/lib/utils"
import ProjectCard3D from "@/components/project-card-3d"

interface ProjectMedia {
  type: "image" | "video"
  url: string
  thumbnail?: string
}

interface Project {
  id: string
  title: string
  description: string
  image: string
  media: ProjectMedia[]
  category: "design" | "photo" | "video" | "code"
  qrCode?: boolean
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const { playSound } = useAudioContext()
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState<Record<string, number>>({})
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({})
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({})

  // Sample projects with multiple media items
  const projects: Project[] = [
    {
      id: "1",
      title: "Campus Event Poster",
      description:
        "Designed promotional materials for IIITD's annual cultural festival using Adobe Illustrator and Photoshop.",
      image: "/placeholder.svg?height=400&width=600",
      media: [
        { type: "image", url: "/media/design/poster1.jpg" },
        { type: "image", url: "/media/design/poster2.jpg" },
        { type: "image", url: "/media/design/poster3.jpg" },
      ],
      category: "design",
      qrCode: true,
    },
    {
      id: "2",
      title: "Nature Photography Series",
      description: "A collection of landscape and wildlife photographs captured during treks in the Himalayas.",
      image: "/placeholder.svg?height=400&width=600",
      media: [
        { type: "image", url: "/media/photo/nature1.jpg" },
        { type: "image", url: "/media/photo/nature2.jpg" },
        { type: "image", url: "/media/photo/nature3.jpg" },
        { type: "image", url: "/media/photo/nature4.jpg" },
      ],
      category: "photo",
    },
    {
      id: "3",
      title: "College Documentary",
      description: "A short documentary about student life at IIITD, edited with DaVinci Resolve.",
      image: "/placeholder.svg?height=400&width=600",
      media: [
        { type: "image", url: "/media/video/documentary-thumb.jpg"},
        { type: "image", url: "/media/video/behind1.jpg" },
        { type: "image", url: "/media/video/behind2.jpg" },
      ],
      category: "video",
    },
    {
      id: "4",
      title: "Data Visualization Tool",
      description: "A Python application that visualizes complex datasets with interactive elements.",
      image: "/placeholder.svg?height=400&width=600",
      media: [
        { type: "image", url: "/media/code/viz1.jpg" },
        { type: "image", url: "/media/code/viz2.jpg" },
      ],
      category: "code",
    },
    {
      id: "5",
      title: "Product Photography",
      description: "Commercial photography for a local startup's product line.",
      image: "/placeholder.svg?height=400&width=600",
      media: [
        { type: "image", url: "/media/photo/product1.jpg" },
        { type: "image", url: "/media/photo/product2.jpg" },
        { type: "image", url: "/media/photo/product3.jpg" },
      ],
      category: "photo",
      qrCode: true,
    },
    {
      id: "6",
      title: "UI Design System",
      description: "A comprehensive design system created in Figma for a web application.",
      image: "/placeholder.svg?height=400&width=600",
      media: [
        { type: "image", url: "/media/design/ui1.jpg" },
        { type: "image", url: "/media/design/ui2.jpg" },
        { type: "image", url: "/media/design/ui3.jpg" },
      ],
      category: "design",
    },
  ]

  // Initialize slide indices and playing states
  useEffect(() => {
    const initialSlideIndices: Record<string, number> = {}
    const initialPlayingStates: Record<string, boolean> = {}

    projects.forEach((project) => {
      initialSlideIndices[project.id] = 0
      initialPlayingStates[project.id] = false
    })

    setCurrentSlideIndex(initialSlideIndices)
    setIsPlaying(initialPlayingStates)
  }, [])

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    playSound("click")
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    playSound("click")

    // Reset video playing state when opening a project
    if (project.media.some((m) => m.type === "video")) {
      setTimeout(() => {
        const videoElements = document.querySelectorAll("video")
        videoElements.forEach((video) => {
          video.pause()
          video.currentTime = 0
        })
      }, 100)
    }
  }

  const handlePrevSlide = (projectId: string) => {
    setCurrentSlideIndex((prev) => {
      const currentIndex = prev[projectId] || 0
      const project = projects.find((p) => p.id === projectId)
      if (!project) return prev

      const newIndex = currentIndex === 0 ? project.media.length - 1 : currentIndex - 1
      return { ...prev, [projectId]: newIndex }
    })
    playSound("click")
  }

  const handleNextSlide = (projectId: string) => {
    setCurrentSlideIndex((prev) => {
      const currentIndex = prev[projectId] || 0
      const project = projects.find((p) => p.id === projectId)
      if (!project) return prev

      const newIndex = currentIndex === project.media.length - 1 ? 0 : currentIndex + 1
      return { ...prev, [projectId]: newIndex }
    })
    playSound("click")
  }

  const handleVideoPlayToggle = (projectId: string) => {
    const videoRef = videoRefs.current[projectId]
    if (!videoRef) return

    if (videoRef.paused) {
      videoRef.play()
      setIsPlaying((prev) => ({ ...prev, [projectId]: true }))
    } else {
      videoRef.pause()
      setIsPlaying((prev) => ({ ...prev, [projectId]: false }))
    }

    playSound("click")
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "design":
        return <Palette className="h-5 w-5" />
      case "photo":
        return <Camera className="h-5 w-5" />
      case "video":
        return <Film className="h-5 w-5" />
      case "code":
        return <Code className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <section id="projects" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A selection of my creative and technical work across different mediums. Explore my projects to see my skills
            in action.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => handleCategoryChange("all")}
            className="flex items-center gap-2"
          >
            All
          </Button>
          <Button
            variant={activeCategory === "design" ? "default" : "outline"}
            onClick={() => handleCategoryChange("design")}
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Design
          </Button>
          <Button
            variant={activeCategory === "photo" ? "default" : "outline"}
            onClick={() => handleCategoryChange("photo")}
            className="flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            Photography
          </Button>
          <Button
            variant={activeCategory === "video" ? "default" : "outline"}
            onClick={() => handleCategoryChange("video")}
            className="flex items-center gap-2"
          >
            <Film className="h-4 w-4" />
            Video
          </Button>
          <Button
            variant={activeCategory === "code" ? "default" : "outline"}
            onClick={() => handleCategoryChange("code")}
            className="flex items-center gap-2"
          >
            <Code className="h-4 w-4" />
            Code
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              {index === 0 ? (
                <ProjectCard3D project={project} onClick={() => handleProjectClick(project)} />
              ) : (
                <Card
                  className={cn(
                    "h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg",
                    project.qrCode && "qr-code-project",
                  )}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* Show slideshow preview with indicators */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={project.media[0]?.url || project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />

                      {/* Slideshow indicators */}
                      {project.media.length > 1 && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                          {project.media.map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-background/70"}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Video indicator */}
                      {project.media.some((m) => m.type === "video") && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="bg-primary/90 rounded-full p-3">
                            <Play className="h-6 w-6 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute top-2 right-2 bg-background/80 p-1 rounded-full">
                      {getCategoryIcon(project.category)}
                    </div>
                    {project.qrCode && (
                      <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-full">
                        <QrCode className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {/* Media slideshow */}
              <div className="relative h-64 md:h-96 overflow-hidden rounded-md bg-black">
                {selectedProject.media.map((media, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === (currentSlideIndex[selectedProject.id] || 0)
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.url || "/placeholder.svg"}
                        alt={`${selectedProject.title} - Image ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <video
                          ref={(el) => {
                            if (el) videoRefs.current[selectedProject.id] = el
                          }}
                          src={media.url}
                          poster={media.thumbnail}
                          className="w-full h-full object-contain"
                          controls={false}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVideoPlayToggle(selectedProject.id)
                          }}
                        >
                          {!isPlaying[selectedProject.id] && (
                            <div className="bg-primary/90 rounded-full p-4">
                              <Play className="h-8 w-8 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Navigation arrows */}
                {selectedProject.media.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePrevSlide(selectedProject.id)
                      }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNextSlide(selectedProject.id)
                      }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>

                    {/* Slide indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {selectedProject.media.map((_, i) => (
                        <button
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i === (currentSlideIndex[selectedProject.id] || 0) ? "bg-primary" : "bg-background/70"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentSlideIndex((prev) => ({ ...prev, [selectedProject.id]: i }))
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Video controls */}
                {selectedProject.media[currentSlideIndex[selectedProject.id] || 0]?.type === "video" && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="bg-background/80 rounded-full p-2 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleVideoPlayToggle(selectedProject.id)
                        }}
                      >
                        {isPlaying[selectedProject.id] ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </div>
              {selectedProject.qrCode && (
                <div className="flex items-center gap-4 p-4 bg-muted rounded-md">
                  <QrCode className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">Physical Connection</h4>
                    <p className="text-sm text-muted-foreground">
                      Scan the QR code to see this project in the physical world.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
