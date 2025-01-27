import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Services() {
  return (
    <main className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/20 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our services</h1>
            <p className="text-xl text-gray-400 mb-8">Because & we have more !!</p>
            <p className="text-gray-400">
              At HR Solutions, we are dedicated to providing comprehensive HR recruitment services that will level
              things down. Our team of hand-picked professionals ensures that we connect the right talent with the right
              opportunities, creating a dynamic workforce that drives your business forward.
            </p>
          </div>
        </div>
      </section>

      {/* LinkedIn Branding Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zholkg3XuLjqkVaBPu0akndTjxdB5s.png"
                alt="LinkedIn Branding Interface"
                width={300}
                height={600}
                className="mx-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">LinkedIn Branding</h2>
              <p className="text-gray-400">
                Unlock the full potential of your organization with our Company Portal. Streamline HR processes, manage
                employee information effortlessly, and enhance collaboration within your team.
              </p>
              <Button
                variant="outline"
                className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
              >
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Options Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Premium Options</h2>
              <p className="text-gray-400">
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zholkg3XuLjqkVaBPu0akndTjxdB5s.png"
                alt="Premium Options Interface"
                width={300}
                height={600}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

