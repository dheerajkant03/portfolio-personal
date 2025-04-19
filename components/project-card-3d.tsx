"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import { Text, PerspectiveCamera } from "@react-three/drei"
import { Card } from "@/components/ui/card"
import { useAudioContext } from "@/context/audio-context"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    category: string
  }
  onClick: () => void
}

function Scene({ project, hover }: { project: ProjectCardProps["project"]; hover: boolean }) {
  const { camera } = useThree()
  const textRef = useRef<any>()
  const meshRef = useRef<any>()

  useEffect(() => {
    camera.position.z = 5
  }, [camera])

  const { rotation } = useSpring({
    rotation: hover ? [0, Math.PI / 12, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  })

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <animated.mesh rotation={rotation as any}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial map={null} color="#1e293b" />

        <Text
          ref={textRef}
          position={[0, 0.5, 0.1]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          {project.title}
        </Text>

        <Text position={[0, 0, 0.1]} fontSize={0.1} color="white" anchorX="center" anchorY="middle" maxWidth={2.5}>
          {project.description}
        </Text>

        <mesh ref={meshRef} position={[-1, -0.7, 0.2]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#0ea5e9" />
        </mesh>
      </animated.mesh>
    </>
  )
}

export default function ProjectCard3D({ project, onClick }: ProjectCardProps) {
  const [hover, setHover] = useState(false)
  const { playSound } = useAudioContext()

  const handleMouseEnter = () => {
    setHover(true)
    playSound("hover")
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <Card
      className="h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-48">
        <Canvas>
          <Scene project={project} hover={hover} />
        </Canvas>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm">{project.description}</p>
      </div>
    </Card>
  )
}
