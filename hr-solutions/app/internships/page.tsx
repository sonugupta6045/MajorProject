import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function Internships() {
  return (
    <main className="relative min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Gauranteed Internships</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Discover a world of endless opportunities through our Guaranteed Internships program. Gain valuable
              experience and unlock your potential for future success.
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vJk4qKxMFeQNmc9cPjlyzMMGFj2ffv.png"
              alt="Internships Mobile Interface"
              width={400}
              height={800}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

