import { toPng } from "html-to-image"
import { jsPDF } from "jspdf"

export const generatePDF = async (element: HTMLElement | null) => {
  if (!element) return

  try {
    const imgData = await toPng(element, { quality: 0.95 })
    const pdf = new jsPDF()

    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("resume.pdf")
  } catch (error) {
    console.error("Error generating PDF:", error)
  }
}

