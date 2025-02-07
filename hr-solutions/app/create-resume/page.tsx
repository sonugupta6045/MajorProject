"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, MinusCircle, Download } from "lucide-react"
import ResumePreview from "../../components/resume-preview";
import { generatePDF } from "@/lib/generate-pdf"


export default function CreateResumePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experiences: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [""],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (index: number, field: "experiences" | "education", subfield: string, value: string) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray[index] = { ...newArray[index], [subfield]: value }
      return { ...prev, [field]: newArray }
    })
  }

  const handleSkillChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills]
      newSkills[index] = value
      return { ...prev, skills: newSkills }
    })
  }

  const addField = (field: "experiences" | "education" | "skills") => {
    setFormData((prev) => {
      if (field === "skills") {
        return { ...prev, [field]: [...prev[field], ""] }
      }
      const emptyObject =
        field === "experiences"
          ? { title: "", company: "", duration: "", description: "" }
          : { degree: "", institution: "", year: "" }
      return { ...prev, [field]: [...prev[field], emptyObject] }
    })
  }

  const removeField = (field: "experiences" | "education" | "skills", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const resumeRef = useRef<HTMLDivElement>(null)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Your Resume</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resume Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea id="summary" name="summary" value={formData.summary} onChange={handleInputChange} />
              </div>

              <div>
                <Label>Experience</Label>
                {formData.experiences.map((exp, index) => (
                  <div key={index} className="space-y-2 mt-2">
                    <Input
                      placeholder="Job Title"
                      value={exp.title}
                      onChange={(e) => handleArrayInputChange(index, "experiences", "title", e.target.value)}
                    />
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleArrayInputChange(index, "experiences", "company", e.target.value)}
                    />
                    <Input
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => handleArrayInputChange(index, "experiences", "duration", e.target.value)}
                    />
                    <Textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => handleArrayInputChange(index, "experiences", "description", e.target.value)}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeField("experiences", index)}>
                      <MinusCircle className="h-4 w-4 mr-2" /> Remove Experience
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField("experiences")} className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Experience
                </Button>
              </div>

              <div>
                <Label>Education</Label>
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-2 mt-2">
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleArrayInputChange(index, "education", "degree", e.target.value)}
                    />
                    <Input
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleArrayInputChange(index, "education", "institution", e.target.value)}
                    />
                    <Input
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleArrayInputChange(index, "education", "year", e.target.value)}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeField("education", index)}>
                      <MinusCircle className="h-4 w-4 mr-2" /> Remove Education
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField("education")} className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </div>

              <div>
                <Label>Skills</Label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={() => removeField("skills", index)}>
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField("skills")} className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResumePreview data={formData} ref={resumeRef} />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={() => generatePDF(resumeRef.current)} className="w-full max-w-md">
          <Download className="mr-2 h-4 w-4" /> Create and Download Resume
        </Button>
      </div>
    </div>
  )
}

