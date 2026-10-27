
export interface Servicio {
  id: number;
  codigo: string;
  tipo: string;
  nombre: string;
  duracion: string;
  modalidad: string;
  profesional: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

export const servicios: Servicio[] = [
  {
    id: 1,
    codigo: "CN001",
    tipo: "Consulta",
    nombre: "Primera Consulta Nutricional",
    duracion: "50 minutos",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 35000,
    descripcion:
      "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio.",
    imagen: "/images/primera-consulta.jpg",
  },
  {
    id: 2,
    codigo: "CN002",
    tipo: "Consulta",
    nombre: "Consulta nutricional de seguimiento",
    duracion: "30 minutos",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 25000,
    descripcion:
      "Seguimiento mensual: medición de indicadores y ajuste del plan vigente.",
    imagen: "/images/consulta-nutri.jpg",
  },
  {
    id: 3,
    codigo: "CN003",
    tipo: "Consulta",
    nombre: "Consulta Nutricional Quincenal",
    duracion: "30 minutos",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 22000,
    descripcion:
      "Seguimiento intensivo cada 15 días. Recomendado en los primeros 2 meses.",
    imagen: "/images/consu-quincenal.jpg",
  },
  {
    id: 4,
    codigo: "CN004",
    tipo: "Consulta",
    nombre: "Teleconsulta Nutricional",
    duracion: "30 minutos",
    modalidad: "Online",
    profesional: "Nutricionista",
    precio: 20000,
    descripcion:
      "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa.",
    imagen: "/images/telemedendocrino.jpg",
  },
  {
    id: 5,
    codigo: "CN005",
    tipo: "Consulta",
    nombre: "Consulta de urgencia / Reagendada",
    duracion: "30 minutos",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 28000,
    descripcion:
      "Para pacientes que requieren atención fuera de su control habitual.",
    imagen: "/images/consu-quincenal.jpg",
  },
  {
    id: 6,
    codigo: "PL001",
    tipo: "Plan especializado",
    nombre: "Plan pérdida de peso (1 mes)",
    duracion: "1 mes",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 65000,
    descripcion:
        "Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp.",
    imagen: "/images/programa-para-perder-peso.webp",
  },
  {
    id: 7,
    codigo: "PL002",
    tipo: "Plan especializado",
    nombre: "Plan pérdida de peso (3 meses)",
    duracion: "3 meses",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 170000,
    descripcion:
        "Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo.",
    imagen: "/images/baja-de-peso-con-nutricion-saludable.webp",
  },
  {
    id: 8,
    codigo: "PL003",
    tipo: "Plan especializado",
    nombre: "Plan nutrición deportiva",
    duracion: "1 mes",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 70000,
    descripcion:
        "Para deportistas y personas con actividad física frecuente. Cálculo de requerimientos energéticos y proteicos.",
    imagen: "/images/nutricion.jpg",
  },
  {
    id: 9,
    codigo: "PL004",
    tipo: "Plan especializado",
    nombre: "Plan control de diabetes / hipertensión",
    duracion: "N/A",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 75000,
    descripcion:
        "Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica.",
    imagen: "/images/presion-arterial-696x464.jpg",
  },
  {
    id: 10,
    codigo: "PL005",
    tipo: "Plan especializado",
    nombre: "Plan alimentación vegetariana / vegana",
    duracion: "N/A",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 68000,
    descripcion:
        "Diseñado para garantizar aporte adecuado de proteínas, hierro, vitamina B12 y calcio sin productos animales.",
    imagen: "/images/menu-semanal-vegetariano-de-rechupete.webp",
  },
  {
    id: 11,
    codigo: "PL006",
    tipo: "Plan especializado",
    nombre: "Plan alimentación infantil",
    duracion: "N/A",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 65000,
    descripcion:
        "Evaluación nutricional pediátrica y diseño de plan adaptado a la etapa de desarrollo del niño.",
    imagen: "/images/ALIMENTACIÓN.webp",
  },
  {
    id: 12,
    codigo: "EV001",
    tipo: "Evaluación",
    nombre: "Antropometría completa",
    duracion: "20 minutos",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 18000,
    descripcion:
        "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y porcentaje de grasa corporal con bioimpedanciometría.",
    imagen: "/images/istockphoto-1452595998-612x612.jpg",
  },
  {
    id: 13,
    codigo: "EV002",
    tipo: "Evaluación",
    nombre: "Bioimpedanciometría",
    duracion: "15 minutos",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 12000,
    descripcion:
        "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica.",
    imagen: "/images/bioimpedancia-inbody.webp",
  },
  {
    id: 14,
    codigo: "EV003",
    tipo: "Evaluación",
    nombre: "Encuesta de hábitos alimenticios",
    duracion: "20 minutos",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 10000,
    descripcion:
        "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales.",
    imagen: "/images/1109.jpg",
  },
  {
    id: 15,
    codigo: "EV004",
    tipo: "Evaluación",
    nombre: "Análisis de exámenes de laboratorio",
    duracion: "20 minutos",
    modalidad: "Presencial",
    profesional: "Nutricionista",
    precio: 15000,
    descripcion:
        "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional.",
    imagen:
        "/images/Mens-Lab-Testing-for-low-hormone-levels-1024x684.jpeg",
  },
  {
    id: 16,
    codigo: "TG001",
    tipo: "Taller grupal",
    nombre: "Taller de alimentación saludable",
    duracion: "90 minutos",
    modalidad: "Presencial (grupo)",
    profesional: "Nutricionista",
    precio: 15000,
    descripcion:
        "Máximo 10 personas. Conceptos básicos de alimentación equilibrada y lectura de etiquetas.",
    imagen:
        "/images/actividades-para-trabajar-la-alimentacion-saludable-en-infantil.jpg",
  },
  {
    id: 17,
    codigo: "TG002",
    tipo: "Taller grupal",
    nombre: "Taller de cocina nutritiva",
    duracion: "120 minutos",
    modalidad: "Presencial (grupo)",
    profesional: "Nutricionista",
    precio: 20000,
    descripcion:
        "Preparación de recetas saludables. Incluye degustación. Máximo 8 personas.",
    imagen: "/images/cursos-nutricion.jpg",
  },
  {
    id: 18,
    codigo: "TG003",
    tipo: "Taller grupal",
    nombre: "Taller nutrición para deportistas",
    duracion: "90 minutos",
    modalidad: "Presencial (grupo)",
    profesional: "Nutricionista",
    precio: 18000,
    descripcion:
        "Hidratación, nutrición pre y post entrenamiento, suplementación básica. Máximo 12 personas.",
    imagen: "/images/nutricionista-deportivo-los-angeles.png",
  },
];