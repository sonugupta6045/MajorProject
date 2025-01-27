"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Service {
  icon: string
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: "💼",
    title: "Service-1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis sagittis nunc. Ut non eleifend ipsum, nisi architecto amet expellendus interruptus eros metus.",
  },
  // Add more services as needed
]

export function ServiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((current) => (current + 1) % services.length)
  }

  const previous = () => {
    setCurrentIndex((current) => (current - 1 + services.length) % services.length)
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">{services[currentIndex].icon}</div>
        <p className="text-gray-300 mb-4">{services[currentIndex].description}</p>
        <h3 className="text-purple-400 font-semibold">{services[currentIndex].title}</h3>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2">
        <Button variant="ghost" size="icon" onClick={previous} className="text-white hover:text-purple-400">
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2">
        <Button variant="ghost" size="icon" onClick={next} className="text-white hover:text-purple-400">
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}

