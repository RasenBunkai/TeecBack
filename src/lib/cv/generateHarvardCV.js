import {jsPDF} from "jspdf";

/**
 * @typedef {{
 *  personal: { name: string, email?: string, phone?: string, address?: string },
 *  education: Array<{ institution?: string, degree?: string, dates?: string }>,
 *  experience: Array<{ position?: string, company?: string, dates?: string, description?: string }>,
 *  skills: string[],
 *  publications?: string,
 *  awards?: string
 * }} HarvardCVData
 */

/**
 * Genera y descarga un CV estilo Harvard en PDF.
 * @param {HarvardCVData} data
 * @param {{ filename?: string }} [options]
 */
export function generateHarvardCV(data, options = {}) {
  const filename = options.filename ?? "Harvard_cv.pdf";

  const {personal, education, experience, skills, publications, awards} = data;

  const doc = new jsPDF();

  const pageHeight = doc.internal.pageSize.getHeight();
  const topMargin = 15;
  const bottomMargin = 15;

  let yPos = topMargin;

  const resetY = () => {
    yPos = topMargin;
  };

  const ensureSpace = (needed = 10) => {
    if (yPos + needed > pageHeight - bottomMargin) {
      doc.addPage();
      resetY();
    }
  };

  const writeWrapped = (text, x, maxWidth, lineHeight = 6) => {
    const lines = doc.splitTextToSize(String(text ?? ""), maxWidth);
    lines.forEach((line) => {
      ensureSpace(lineHeight);
      doc.text(line, x, yPos);
      yPos += lineHeight;
    });
    return lines.length;
  };

  const writeSectionTitle = (title) => {
    ensureSpace(20);
    doc.setFontSize(12);
    doc.setTextColor(0, 86, 145);
    doc.text(title, 15, yPos);
    yPos += 7;
    doc.setDrawColor(0, 86, 145);
    doc.line(15, yPos, 60, yPos);
    yPos += 10;
  };

  // Header
  ensureSpace(20);
  doc.setFont("helvetica");
  doc.setFontSize(16);
  doc.setTextColor(0, 86, 145);
  doc.text(personal.name, 15, yPos);
  yPos += 10;

  // Información de contacto
  doc.setFontSize(10);
  doc.setTextColor(0);
  const contactInfo = [personal.email, personal.phone, personal.address]
    .filter(Boolean)
    .join(" | ");

  if (contactInfo) {
    ensureSpace(12);
    doc.text(contactInfo, 15, yPos);
    yPos += 15;
  } else {
    yPos += 10;
  }

  // Educación
  writeSectionTitle("EDUCACIÓN");

  (education ?? [])
    .filter((e) => e?.institution || e?.degree || e?.dates)
    .forEach((edu) => {
      ensureSpace(18);
      doc.setFontSize(10);

      doc.setFont("helvetica", "bold");
      const instLines = doc.splitTextToSize(edu.institution || "", 120);
      instLines.forEach((line) => {
        ensureSpace(6);
        doc.text(line, 15, yPos);
        yPos += 6;
      });

      doc.setFont("helvetica", "normal");
      if (edu.degree) {
        ensureSpace(6);
        doc.text(edu.degree, 15, yPos);
        yPos += 6;
      }

      if (edu.dates) {
        doc.text(edu.dates, 150, yPos - (edu.degree ? 6 : 12), {
          align: "right",
        });
      }

      yPos += 6;
    });

  // Experiencia Profesional
  yPos += 5;
  writeSectionTitle("EXPERIENCIA PROFESIONAL");

  (experience ?? [])
    .filter((e) => e?.position || e?.company || e?.dates || e?.description)
    .forEach((exp) => {
      ensureSpace(22);
      doc.setFontSize(10);

      doc.setFont("helvetica", "bold");
      const posLines = doc.splitTextToSize(exp.position || "", 120);
      posLines.forEach((line) => {
        ensureSpace(6);
        doc.text(line, 15, yPos);
        yPos += 6;
      });

      doc.setFont("helvetica", "normal");
      if (exp.company) {
        ensureSpace(6);
        doc.text(exp.company, 15, yPos);
        yPos += 6;
      }

      if (exp.dates) {
        doc.text(exp.dates, 150, yPos - (exp.company ? 6 : 12), {
          align: "right",
        });
      }

      if (exp.description) {
        const lines = doc.splitTextToSize(exp.description, 165);
        lines.forEach((line) => {
          ensureSpace(6);
          doc.text("• " + line, 20, yPos);
          yPos += 6;
        });
      }

      yPos += 6;
    });

  // Habilidades
  writeSectionTitle("HABILIDADES TÉCNICAS");
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const skillsText = (skills ?? []).filter(Boolean).join(", ");
  if (skillsText) {
    writeWrapped(skillsText, 15, 180, 6);
    yPos += 6;
  } else {
    ensureSpace(6);
    doc.text("-", 15, yPos);
    yPos += 12;
  }

  // Publicaciones y premios
  if (publications?.trim()) {
    writeSectionTitle("PUBLICACIONES");
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    writeWrapped(publications.trim(), 15, 180, 6);
    yPos += 6;
  }

  if (awards?.trim()) {
    writeSectionTitle("PREMIOS Y RECONOCIMIENTOS");
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    writeWrapped(awards.trim(), 15, 180, 6);
    yPos += 6;
  }

  doc.save(filename);
}
