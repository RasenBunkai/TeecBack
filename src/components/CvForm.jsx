import React, {useState} from "react";
import {jsPDF} from "jspdf";

const CvForm = () => {
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [education, setEducation] = useState([
    {institution: "", degree: "", dates: ""},
  ]);
  const [experience, setExperience] = useState([
    {position: "", company: "", dates: "", description: ""},
  ]);
  const [skills, setSkills] = useState([""]);
  const [publications, setPublications] = useState("");
  const [awards, setAwards] = useState("");

  // Agregar campos dinámicos
  const addEducationField = () => {
    setEducation([...education, {institution: "", degree: "", dates: ""}]);
  };

  const addExperienceField = () => {
    setExperience([
      ...experience,
      {position: "", company: "", dates: "", description: ""},
    ]);
  };

  const addSkillField = () => {
    setSkills([...skills, ""]);
  };

  // Manejadores de cambios en campos de arrays
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  // Función para generar el CV en PDF
  const generateHarvardCV = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Header
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.setTextColor(0, 86, 145); // Azul Harvard
    doc.text(personal.name, 15, yPos);
    yPos += 10;

    // Información de contacto
    doc.setFontSize(10);
    doc.setTextColor(0);
    const contactInfo = [personal.email, personal.phone, personal.address]
      .filter(Boolean)
      .join(" | ");
    doc.text(contactInfo, 15, yPos);
    yPos += 15;

    // Educación
    doc.setFontSize(12);
    doc.setTextColor(0, 86, 145);
    doc.text("EDUCACIÓN", 15, yPos);
    yPos += 7;
    doc.setDrawColor(0, 86, 145);
    doc.line(15, yPos, 60, yPos);
    yPos += 10;
    education.forEach((edu) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(edu.institution, 15, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(edu.degree, 15, yPos + 5);
      doc.text(edu.dates, 150, yPos, {align: "right"});
      yPos += 15;
    });

    // Experiencia Profesional
    yPos += 5;
    doc.setFontSize(12);
    doc.setTextColor(0, 86, 145);
    doc.text("EXPERIENCIA PROFESIONAL", 15, yPos);
    yPos += 7;
    doc.line(15, yPos, 60, yPos);
    yPos += 10;
    experience.forEach((exp) => {
      doc.setFont("helvetica", "bold");
      doc.text(exp.position, 15, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(exp.company, 15, yPos + 5);
      doc.text(exp.dates, 150, yPos, {align: "right"});
      yPos += 10;
      const splitDesc = doc.splitTextToSize(exp.description, 170);
      splitDesc.forEach((line) => {
        doc.text("• " + line, 20, yPos);
        yPos += 7;
      });
      yPos += 5;
    });

    // Habilidades
    doc.setFontSize(12);
    doc.setTextColor(0, 86, 145);
    doc.text("HABILIDADES TÉCNICAS", 15, yPos);
    yPos += 7;
    doc.line(15, yPos, 60, yPos);
    yPos += 10;
    doc.setFontSize(10);
    const skillsText = skills.filter(Boolean).join(", ");
    doc.text(skillsText, 15, yPos, {maxWidth: 180});
    yPos += 15;

    // Publicaciones
    if (publications) {
      doc.setFontSize(12);
      doc.setTextColor(0, 86, 145);
      doc.text("PUBLICACIONES", 15, yPos);
      yPos += 7;
      doc.line(15, yPos, 60, yPos);
      yPos += 10;
      doc.setFontSize(10);
      const splitPub = doc.splitTextToSize(publications, 180);
      splitPub.forEach((line) => {
        doc.text(line, 15, yPos);
        yPos += 7;
      });
      yPos += 5;
    }

    // Premios y Reconocimientos
    if (awards) {
      doc.setFontSize(12);
      doc.setTextColor(0, 86, 145);
      doc.text("PREMIOS Y RECONOCIMIENTOS", 15, yPos);
      yPos += 7;
      doc.line(15, yPos, 60, yPos);
      yPos += 10;
      doc.setFontSize(10);
      const splitAwards = doc.splitTextToSize(awards, 180);
      splitAwards.forEach((line) => {
        doc.text(line, 15, yPos);
        yPos += 7;
      });
      yPos += 5;
    }

    doc.save("Harvard_CV.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Crea tu propio CV
      </h3>
      <form className="space-y-6">
        {/* Información Personal */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Información Personal
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                value={personal.name}
                onChange={(e) =>
                  setPersonal({...personal, name: e.target.value})
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                value={personal.email}
                onChange={(e) =>
                  setPersonal({...personal, email: e.target.value})
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="tel"
                value={personal.phone}
                onChange={(e) =>
                  setPersonal({...personal, phone: e.target.value})
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                type="text"
                value={personal.address}
                onChange={(e) =>
                  setPersonal({...personal, address: e.target.value})
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>
        </div>

        {/* Educación */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Educación
          </h2>
          <div id="educationEntries" className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="education-entry">
                <input
                  type="text"
                  placeholder="Institución"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mb-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Título obtenido"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mb-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Fechas (YYYY-YYYY)"
                  value={edu.dates}
                  onChange={(e) =>
                    handleEducationChange(index, "dates", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addEducationField}
            className="text-blue-600 text-sm mt-2">
            + Agregar otra institución
          </button>
        </div>

        {/* Experiencia Profesional */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Experiencia Profesional
          </h2>
          <div id="experienceEntries" className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="experience-entry">
                <input
                  type="text"
                  placeholder="Posición"
                  value={exp.position}
                  onChange={(e) =>
                    handleExperienceChange(index, "position", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mb-2"
                />
                <input
                  type="text"
                  placeholder="Empresa"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mb-2"
                />
                <input
                  type="text"
                  placeholder="Fechas (MM/YYYY - MM/YYYY)"
                  value={exp.dates}
                  onChange={(e) =>
                    handleExperienceChange(index, "dates", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mb-2"
                />
                <textarea
                  placeholder="Descripción (1-2 puntos)"
                  value={exp.description}
                  onChange={(e) =>
                    handleExperienceChange(index, "description", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 h-20"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addExperienceField}
            className="text-blue-600 text-sm mt-2">
            + Agregar otra experiencia
          </button>
        </div>

        {/* Habilidades Técnicas */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Habilidades Técnicas
          </h2>
          <div id="skillEntries" className="grid grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                placeholder="Habilidad"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addSkillField}
            className="text-blue-600 text-sm mt-2">
            + Agregar habilidad
          </button>
        </div>

        {/* Publicaciones y Premios */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Publicaciones y Premios
          </h2>
          <textarea
            id="publications"
            placeholder="Lista de publicaciones (formato APA)"
            value={publications}
            onChange={(e) => setPublications(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 h-32"
          />
          <textarea
            id="awards"
            placeholder="Premios y reconocimientos"
            value={awards}
            onChange={(e) => setAwards(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 h-32 mt-4"
          />
        </div>

        <button
          type="button"
          onClick={generateHarvardCV}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Generar CV en formato Harvard
        </button>
      </form>
    </div>
  );
};

export default CvForm;
