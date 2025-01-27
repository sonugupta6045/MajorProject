import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Jobs() {
  return (
    <main className="relative min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Job Listings</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Find your dream job with our Job Listings service. Explore a diverse range of career opportunities and
              take the next step towards a rewarding professional journey.
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WcRaKai2eVerx5xlXermvUZsljfUfD.png"
              alt="Job Listings Mobile Interface"
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

