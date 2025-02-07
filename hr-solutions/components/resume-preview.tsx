import { forwardRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ResumeData {
  name: string
  email: string
  phone: string
  summary: string
  experiences: { title: string; company: string; duration: string; description: string }[]
  education: { degree: string; institution: string; year: string }[]
  skills: string[]
}

const ResumePreview = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  return (
    <Card className="w-full max-w-3xl mx-auto" ref={ref}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {data.email} | {data.phone}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="font-semibold mb-2">Professional Summary</h3>
          <p className="text-sm">{data.summary}</p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Experience</h3>
          {data.experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-medium">{exp.title}</h4>
              <div className="text-sm text-muted-foreground">
                {exp.company} | {exp.duration}
              </div>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="font-semibold mb-2">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h4 className="font-medium">{edu.degree}</h4>
              <div className="text-sm text-muted-foreground">
                {edu.institution} | {edu.year}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
})

ResumePreview.displayName = "ResumePreview"

export default ResumePreview

