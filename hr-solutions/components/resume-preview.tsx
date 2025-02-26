import { forwardRef } from "react"

interface ResumeData {
  name: string
  email: string
  phone: string
  address: string
  linkedin: string
  github: string
  summary: string
  experiences: {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string
  }[]
  education: {
    degree: string
    institution: string
    location: string
    graduationDate: string
    gpa?: string
    coursework?: string
  }[]
  skills: { category: string; items: string[] }[]
  projects: { name: string; link: string; description: string; techUsed: string }[]
  certifications: string[]
  additionalLinks: { name: string; url: string }[]
}

const ResumePreview = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full max-w-4xl mx-auto bg-white p-6 shadow-lg"
      style={{ fontFamily: "Arial, sans-serif", fontSize: "10px" }}
    >
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase">{data.name}</h1>
        <p>
          {data.address} | {data.email} | {data.phone}
        </p>
        <p>
          {data.linkedin} | {data.github}
        </p>
      </header>

      <section className="mb-4">
        <h2 className="text-lg font-bold border-b border-black mb-2">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <strong>
                {edu.institution}, {edu.degree}
              </strong>
              <span>{edu.graduationDate}</span>
            </div>
            {edu.gpa && <p>GPA: {edu.gpa}</p>}
            {edu.coursework && <p>Coursework: {edu.coursework}</p>}
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-bold border-b border-black mb-2">Experience</h2>
        {data.experiences.map((exp, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <strong>
                {exp.title}, {exp.company} - {exp.location}
              </strong>
              <span>
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <ul className="list-disc list-inside">
              {exp.description.split("\n").map((item, i) => (
                <li key={i}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-bold border-b border-black mb-2">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-2">
            <strong>{project.name}</strong>{" "}
            <a href={project.link} className="text-blue-600">
              Github
            </a>
            <ul className="list-disc list-inside">
              {project.description.split("\n").map((item, i) => (
                <li key={i}>{item.trim()}</li>
              ))}
            </ul>
            <p>Tech Used: {project.techUsed}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-bold border-b border-black mb-2">Skills</h2>
        {data.skills.map((skillCategory, index) => (
          <div key={index} className="mb-1">
            <strong>{skillCategory.category}:</strong> {skillCategory.items.join(", ")}
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-bold border-b border-black mb-2">Certifications</h2>
        <ul className="list-disc list-inside">
          {data.certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold border-b border-black mb-2">Additional Profile Links</h2>
        {data.additionalLinks.map((link, index) => (
          <div key={index}>
            {link.name}:{" "}
            <a href={link.url} className="text-blue-600">
              {link.url}
            </a>
          </div>
        ))}
      </section>
    </div>
  )
})

ResumePreview.displayName = "ResumePreview"

export default ResumePreview

