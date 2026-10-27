
export interface Profesional {
  id: number;
  nombre: string;
  especialidad: string;
  perfil: string;
  modalidad: string;
  horario: string;
  imagen: string;
}

export const profesionales: Profesional[] = [
  {
    id: 1,
    nombre: "Carolina Fuentes M.",
    especialidad: "Obesidad y Síndrome Metabólico",
    perfil:
      "Especialista en el tratamiento integral del exceso de peso, resistencia a la insulina y enfermedades metabólicas. Enfoque centrado en la reeducación alimentaria.",
    modalidad: "Presencial y Online",
    horario: "Lunes a jueves 09:00 - 14:00",
    imagen: "/images/nutricionista2.jpg",
  },
  {
    id: 2,
    nombre: "Rodrigo Sepúlveda A.",
    especialidad: "Nutrición Deportiva y Rendimiento",
    perfil:
      "Enfocado en la optimización de la composición corporal, planificación nutricional para deportistas de alto rendimiento y suplementación basada en evidencia científica.",
    modalidad: "Presencial y Online",
    horario: "Martes a viernes 14:00 - 19:30",
    imagen: "/images/nutricionista3.jpg",
  },
  {
    id: 3,
    nombre: "Daniela Morales C.",
    especialidad:
      "Alimentación Vegetariana/Vegana y Trastornos Alimentarios",
    perfil:
      "Acompañamiento en transiciones hacia dietas basadas en plantas de forma segura y nutricionalmente completa. Abordaje de la relación con la comida desde un enfoque compasivo.",
    modalidad: "Online",
    horario: "Lunes, miércoles y viernes 10:00 - 16:00",
    imagen: "/images/nutricionista.jpg",
  },
  {
    id: 4,
    nombre: "Felipe Araya R.",
    especialidad: "Obesidad y Síndrome Metabólico",
    perfil:
      "Experto en alimentación infantil, lactancia, introducción alimentaria y selectividad alimentaria en niños. Evaluación del crecimiento y estado nutricional familiar.",
    modalidad: "Presencial",
    horario: "Lunes a viernes 09:00 - 13:00",
    imagen: "/images/nutricionista4.jpg",
  },
];