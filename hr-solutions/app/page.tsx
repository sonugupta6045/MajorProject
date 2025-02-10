import { auth, currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ServiceCarousel } from "@/components/service-carousel";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  if (userId && user) {
    // Check if user exists in the database, if not, create them
    let dbUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName} ${user.lastName}`,
        },
      });
    }
  }

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-xl" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-teal-500/20 blur-xl" />
          <div className="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full bg-purple-700/20 blur-xl" />
        </div>
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-400 to-purple-600 text-transparent bg-clip-text">
            Unlock Your Full Potential Here
          </h1>
          <p className="text-gray-400 text-xl">
            Building Exceptional You for Future Success.
          </p>
          <div className="pt-4">
            <Link href="/sign-up">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Connect & Grow Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-80E85E1lrL3CQcjWjlUkjkc5zarNcG.png"
                  alt="LinkedIn Icon"
                  width={32}
                  height={32}
                  className="text-purple-400"
                />
              </div>
              <h2 className="text-4xl font-bold text-white">CONNECT & GROW</h2>
              <p className="text-gray-400">
                Stop depending on others! Build your own brand
              </p>
              <Button
                variant="outline"
                className="text-purple-400 border-purple-400"
              >
                Start Doing!
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-80E85E1lrL3CQcjWjlUkjkc5zarNcG.png"
                alt="Connect & Grow"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-20">
        <ServiceCarousel />
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Personalised Portal */}
            {/* <div className="space-y-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M0wZzMPLOFnnshvoK0CXK7Z3NloYoV.png"
                alt="Personalised Portal"
                width={300}
                height={600}
                className="rounded-lg mx-auto"
              />
              <h3 className="text-2xl font-bold text-white">Job Portal</h3>
              <p className="text-gray-400">Streamline HR processes and enhance collaboration.</p>
              <Button variant="link" className="text-purple-400 p-0">
                Learn More →
              </Button>
            </div> */}

            {/* Job Listings */}
            <div className="space-y-11">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AlGWzHrG8sbpzOr72pIKHkteKI32nt.png"
                alt="Job Listings"
                width={300}
                height={600}
                className="rounded-lg mx-auto"
              />
              <h3 className="text-2xl font-bold text-white">Job Listings</h3>
              <p className="text-gray-400">
                Find your dream job with our listings service.
              </p>
              <Button variant="link" className="text-purple-400 p-0">
                Learn More →
              </Button>
            </div>

            {/* Guaranteed Internships */}
            <div className="space-y-11">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vJk4qKxMFeQNmc9cPjlyzMMGFj2ffv.png"
                alt="Guaranteed Internships"
                width={300}
                height={600}
                className="rounded-lg mx-auto"
              />
              <h3 className="text-2xl font-bold text-white">
                Guaranteed Internships
              </h3>
              <p className="text-gray-400">
                Gain valuable experience and unlock your potential.
              </p>
              <Button variant="link" className="text-purple-400 p-0">
                Learn More →
              </Button>
            </div>

            {/* Resume Builder */}
            <div className="space-y-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mL5cudcozxOqLOcwJXxrSMo0iUZe20.png"
                alt="Resume Builder"
                width={300}
                height={600}
                className="rounded-lg mx-auto"
              />
              <h3 className="text-2xl font-bold text-white">Resume Builder</h3>
              <p className="text-gray-400">
                Craft your perfect resume in minutes.
              </p>
              <Button variant="link" className="text-purple-400 p-0">
                Learn More →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Builder CTA */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Craft Your Perfect Resume
            </h2>
            <p className="text-xl text-gray-400">
              Build Your Winning Resume in Minutes with Our Resume Builder
            </p>
            <Link href="/create-resume">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                CREATE MY RESUME
              </Button>
            </Link>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-purple-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">
                  Make a resume that wins interviews
                </h3>
                <p className="text-gray-400 text-sm">
                  Use our resume maker with its advanced creation tools.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-purple-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 4V20M4 12H20" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">
                  Resume writing made easy!
                </h3>
                <p className="text-gray-400 text-sm">
                  Resume writing has never been this effortless.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-purple-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">
                  A resume maker tool
                </h3>
                <p className="text-gray-400 text-sm">
                  Our resume builder and its pre-generated content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
