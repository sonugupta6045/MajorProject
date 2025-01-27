import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Portal() {
  return (
    <main className="relative min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Personalised Portal</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Unlock the full potential of your organization with our Company Portal. Streamline HR processes, manage
              employee information effortlessly, and enhance collaboration within your team. Take control of your HR
              management and experience a new level of efficiency. Explore the Company Portal today.
            </p>
            <Button
              variant="outline"
              className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
            >
              LEARN MORE
            </Button>
          </div>
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GyLNFyKorHDfwikVYTt4bK9bNFXBN9.png"
              alt="Portal Mobile Interface"
              width={400}
              height={800}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

