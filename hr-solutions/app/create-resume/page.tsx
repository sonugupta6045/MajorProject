"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, MinusCircle, Download } from "lucide-react"
import ResumePreview from "@/components/resume-preview"
import { generatePDF } from "@/lib/generate-pdf"

export default function CreateResumePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    summary: "",
    experiences: [{ title: "", company: "", location: "", startDate: "", endDate: "", description: "" }],
    education: [{ degree: "", institution: "", location: "", graduationDate: "", gpa: "", coursework: "" }],
    skills: [{ category: "", items: [""] }],
    projects: [{ name: "", link: "", description: "", techUsed: "" }],
    certifications: [""],
    additionalLinks: [{ name: "", url: "" }],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (index: number, field: string, subfield: string, value: string) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray[index] = { ...newArray[index], [subfield]: value }
      return { ...prev, [field]: newArray }
    })
  }

  const handleSkillChange = (categoryIndex: number, itemIndex: number, value: string) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills]
      newSkills[categoryIndex].items[itemIndex] = value
      return { ...prev, skills: newSkills }
    })
  }

  const addField = (
    field: "experiences" | "education" | "skills" | "projects" | "certifications" | "additionalLinks",
  ) => {
    setFormData((prev) => {
      if (field === "skills") {
        return { ...prev, [field]: [...prev[field], { category: "", items: [""] }] }
      }
      if (field === "projects") {
        return { ...prev, [field]: [...prev[field], { name: "", link: "", description: "", techUsed: "" }] }
      }
      if (field === "additionalLinks") {
        return { ...prev, [field]: [...prev[field], { name: "", url: "" }] }
      }
      if (field === "certifications") {
        return { ...prev, [field]: [...prev[field], ""] }
      }
      const emptyObject =
        field === "experiences"
          ? { title: "", company: "", location: "", startDate: "", endDate: "", description: "" }
          : { degree: "", institution: "", location: "", graduationDate: "", gpa: "", coursework: "" }
      return { ...prev, [field]: [...prev[field], emptyObject] }
    })
  }

  const removeField = (
    field: "experiences" | "education" | "skills" | "projects" | "certifications" | "additionalLinks",
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const resumeRef = useRef<HTMLDivElement>(null)

  const handleGeneratePDF = () => {
    if (resumeRef.current) {
      generatePDF(resumeRef.current)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Your Resume</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resume Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
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
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" name="github" value={formData.github} onChange={handleInputChange} />
                </div>
              </div>

              <div>
                <Label>Education</Label>
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-2 mt-2">
                    <Input
                      placeholder="Degree & Specialization"
                      value={edu.degree}
                      onChange={(e) => handleArrayInputChange(index, "education", "degree", e.target.value)}
                    />
                    <Input
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleArrayInputChange(index, "education", "institution", e.target.value)}
                    />
                    <Input
                      placeholder="Location"
                      value={edu.location}
                      onChange={(e) => handleArrayInputChange(index, "education", "location", e.target.value)}
                    />
                    <Input
                      placeholder="Graduation Date"
                      value={edu.graduationDate}
                      onChange={(e) => handleArrayInputChange(index, "education", "graduationDate", e.target.value)}
                    />
                    <Input
                      placeholder="GPA"
                      value={edu.gpa}
                      onChange={(e) => handleArrayInputChange(index, "education", "gpa", e.target.value)}
                    />
                    <Input
                      placeholder="Coursework"
                      value={edu.coursework}
                      onChange={(e) => handleArrayInputChange(index, "education", "coursework", e.target.value)}
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
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) => handleArrayInputChange(index, "experiences", "location", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => handleArrayInputChange(index, "experiences", "startDate", e.target.value)}
                      />
                      <Input
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => handleArrayInputChange(index, "experiences", "endDate", e.target.value)}
                      />
                    </div>
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
                <Label>Projects</Label>
                {formData.projects.map((project, index) => (
                  <div key={index} className="space-y-2 mt-2">
                    <Input
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => handleArrayInputChange(index, "projects", "name", e.target.value)}
                    />
                    <Input
                      placeholder="Project Link"
                      value={project.link}
                      onChange={(e) => handleArrayInputChange(index, "projects", "link", e.target.value)}
                    />
                    <Textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => handleArrayInputChange(index, "projects", "description", e.target.value)}
                    />
                    <Input
                      placeholder="Technologies Used"
                      value={project.techUsed}
                      onChange={(e) => handleArrayInputChange(index, "projects", "techUsed", e.target.value)}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeField("projects", index)}>
                      <MinusCircle className="h-4 w-4 mr-2" /> Remove Project
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField("projects")} className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Project
                </Button>
              </div>

              <div>
                <Label>Skills</Label>
                {formData.skills.map((skillCategory, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-2 mt-2">
                    <Input
                      placeholder="Skill Category"
                      value={skillCategory.category}
                      onChange={(e) => handleArrayInputChange(categoryIndex, "skills", "category", e.target.value)}
                    />
                    {skillCategory.items.map((skill, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <Input
                          placeholder="Skill"
                          value={skill}
                          onChange={(e) => handleSkillChange(categoryIndex, itemIndex, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newSkills = [...formData.skills]
                            newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter(
                              (_, i) => i !== itemIndex,
                            )
                            setFormData({ ...formData, skills: newSkills })
                          }}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newSkills = [...formData.skills]
                        newSkills[categoryIndex].items.push("")
                        setFormData({ ...formData, skills: newSkills })
                      }}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeField("skills", categoryIndex)}
                    >
                      <MinusCircle className="h-4 w-4 mr-2" /> Remove Skill Category
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField("skills")} className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Skill Category
                </Button>
              </div>

              <div>
                <Label>Certifications</Label>
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      placeholder="Certification"
                      value={cert}
                      onChange={(e) => handleArrayInputChange(index, "certifications", "", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeField("certifications", index)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField("certifications")} className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Certification
                </Button>
              </div>

              <div>
                <Label>Additional Profile Links</Label>
                {formData.additionalLinks.map((link, index) => (
                  <div key={index} className="space-y-2 mt-2">
                    <Input
                      placeholder="Link Name"
                      value={link.name}
                      onChange={(e) => handleArrayInputChange(index, "additionalLinks", "name", e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => handleArrayInputChange(index, "additionalLinks", "url", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeField("additionalLinks", index)}
                    >
                      <MinusCircle className="h-4 w-4 mr-2" /> Remove Link
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField("additionalLinks")} className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Additional Link
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumePreview data={formData} ref={resumeRef} />
            </CardContent>
          </Card>
          <Button onClick={handleGeneratePDF} className="w-full">
            <Download className="mr-2 h-4 w-4" /> Generate PDF
          </Button>
        </div>
      </div>
    </div>
  )
}

