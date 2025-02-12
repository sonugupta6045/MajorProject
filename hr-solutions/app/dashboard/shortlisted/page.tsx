"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Mail, Phone, Download } from "lucide-react"

// This would typically come from your backend
const shortlistedProfiles = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatars/01.png",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Software Engineer",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    score: 95,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/avatars/02.png",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    role: "UX Designer",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    score: 92,
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "/avatars/03.png",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 246-8135",
    role: "Data Scientist",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    score: 88,
  },
  {
    id: 4,
    name: "Emily Brown",
    avatar: "/avatars/04.png",
    email: "emily.brown@example.com",
    phone: "+1 (555) 369-2580",
    role: "Product Manager",
    skills: ["Agile", "Jira", "User Stories", "Roadmapping"],
    score: 85,
  },
  {
    id: 5,
    name: "Alex Lee",
    avatar: "/avatars/05.png",
    email: "alex.lee@example.com",
    phone: "+1 (555) 159-7531",
    role: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "CI/CD", "Cloud Platforms"],
    score: 82,
  },
]

export default function ShortlistedPage() {
  const [profiles, setProfiles] = useState(shortlistedProfiles)

  const handleDownload = (id: number) => {
    // Implement download logic here
    console.log(`Downloading resume for profile ${id}`)
  }

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-500"
      case 1:
        return "bg-gray-500"
      case 2:
        return "bg-orange-800"
      default:
        return "bg-blue-200"
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Shortlisted Profiles</h1>
      <div className="space-y-6">
        {profiles.map((profile, index) => (
          <Card key={profile.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-16 h-16 ${getRankColor(index)} flex items-center justify-center rounded-br-[50px]`}>
              <span className="text-white text-2xl font-bold ">{index + 1}</span>
            </div>
            <CardContent className="flex items-start space-x-4 pt-6 pl-20">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-muted-foreground">{profile.role}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg text-yellow-700">{profile.score}</span>
                  </div>
                </div>
                <div className="mt-2 flex space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-1" />
                    {profile.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-1" />
                    {profile.phone}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={() => handleDownload(profile.id)}>
                <Download className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

