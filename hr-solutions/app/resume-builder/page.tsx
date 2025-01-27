import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function ResumeBuilder() {
  return (
    <main className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Craft Your Perfect Resume</h1>
            <p className="text-xl text-gray-400">Build Your Winning Resume in Minutes with Our Resume Builder</p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              CREATE MY RESUME
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mL5cudcozxOqLOcwJXxrSMo0iUZe20.png"
                alt="Pick a template"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <Button className="absolute bottom-4 left-4 bg-purple-600 hover:bg-purple-700">Pick →</Button>
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mL5cudcozxOqLOcwJXxrSMo0iUZe20.png"
                alt="Fill your details"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <Button className="absolute bottom-4 left-4 bg-purple-600 hover:bg-purple-700">Fill →</Button>
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mL5cudcozxOqLOcwJXxrSMo0iUZe20.png"
                alt="Download resume"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <Button className="absolute bottom-4 left-4 bg-purple-600 hover:bg-purple-700">Get →</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

