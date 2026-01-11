import React, {useState} from "react";
import {generateHarvardCV} from "../lib/cv/generateHarvardCV";

const CvForm = () => {
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [education, setEducation] = useState([
    {id: crypto.randomUUID(), institution: "", degree: "", dates: ""},
  ]);
  const [experience, setExperience] = useState([
    {
      id: crypto.randomUUID(),
      position: "",
      company: "",
      dates: "",
      description: "",
    },
  ]);

  const [skills, setSkills] = useState([""]);
  const [publications, setPublications] = useState("");
  const [awards, setAwards] = useState("");

  // Agregar campos dinámicos
  const addEducationField = () => {
    setEducation([
      ...education,
      {id: crypto.randomUUID(), institution: "", degree: "", dates: ""},
    ]);
  };

  const addExperienceField = () => {
    setExperience([
      ...experience,
      {
        id: crypto.randomUUID(),
        position: "",
        company: "",
        dates: "",
        description: "",
      },
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
const handleGeneratePDF = () => {
  if (!personal.name.trim()) {
    alert("Por favor, ingresa tu nombre para generar el CV.");
    return;
  }

  generateHarvardCV(
    {
      personal,
      education: education.map(({id, ...rest}) => rest),
      experience: experience.map(({id, ...rest}) => rest),
      skills,
      publications,
      awards,
    },
    {filename: "Harvard_CV.pdf"}
  );
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h4 className="text-indigo-950 text-2xl font-semibold mb-4 tracking-tighter text-pretty pointer-events-none">
        Crea tu propio CV
      </h4>
      <form className="space-y-6">
        {/* Información Personal */}
        {/* Información Personal */}
        <div>
          <h5 className="text-slate-950 text-xl font-semibold mb-4 tracking-tighter text-pretty pointer-events-none">
            Información Personal
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cv-name">
                Nombre completo
              </label>
              <input
                id="cv-name"
                type="text"
                value={personal.name}
                onChange={(e) =>
                  setPersonal({...personal, name: e.target.value})
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cv-email">
                Correo electrónico
              </label>
              <input
                id="cv-email"
                type="email"
                value={personal.email}
                onChange={(e) =>
                  setPersonal({...personal, email: e.target.value})
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cv-phone">
                Teléfono
              </label>
              <input
                id="cv-phone"
                type="tel"
                value={personal.phone}
                onChange={(e) =>
                  setPersonal({...personal, phone: e.target.value})
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                autoComplete="tel"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cv-address">
                Dirección
              </label>
              <input
                id="cv-address"
                type="text"
                value={personal.address}
                onChange={(e) =>
                  setPersonal({...personal, address: e.target.value})
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                autoComplete="street-address"
              />
            </div>
          </div>
        </div>

        {/* Educación */}
        <div>
          <h5 className="text-slate-950 text-xl font-semibold mb-4 tracking-tighter text-pretty pointer-events-none">
            Educación
          </h5>
          <div id="educationEntries" className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id} className="education-entry">
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
          <h5 className="text-slate-950 text-xl font-semibold mb-4 tracking-tighter text-pretty pointer-events-none">
            Experiencia Profesional
          </h5>
          <div id="experienceEntries" className="space-y-4">
            {experience.map((exp, index) => (
              <div key={exp.id} className="experience-entry">
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
          <h5 className="text-slate-950 text-xl font-semibold mb-4 tracking-tighter text-pretty pointer-events-none">
            Habilidades Técnicas
          </h5>
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
          <h5 className="text-slate-950 text-xl font-semibold mb-4 tracking-tighter text-pretty pointer-events-none">
            Publicaciones
          </h5>
          <textarea
            id="publications"
            placeholder="Lista de publicaciones (formato APA)"
            value={publications}
            onChange={(e) => setPublications(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 h-32"
          />
          <h5 className="text-slate-950 text-xl font-semibold mt-4 tracking-tighter text-pretty pointer-events-none">
            Premios
          </h5>
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
          onClick={handleGeneratePDF}
          className="w-full text-lg mt-6 bg-indigo-900 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-950 transition-colors cursor-pointer my-4">
          Generar CV en formato Harvard
        </button>
      </form>
    </div>
  );
};
export default CvForm;
