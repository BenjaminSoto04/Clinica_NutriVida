
export interface Noticia {
  id: number;
  titulo: string;
  imagen: string;
  descripcionCorta: string;
  descripcionLarga: string;
}

export const noticias: Noticia[] = [
  {
    id: 1,
    titulo: "¿Qué es el colesterol?",
    imagen: "/images/menu-semanal-blog.jpg",
    descripcionCorta:
      "El colesterol alto es un problema frecuente que puede aumentar el riesgo de enfermedades cardiovasculares.",
    descripcionLarga:
      "El colesterol es una molécula lipídica presente en el organismo, las membranas celulares, los tejidos y la sangre. Es necesario para producir determinadas hormonas, vitamina D y ácidos biliares. Nuestro cuerpo produce colesterol y también lo obtenemos mediante la alimentación. Cuando sus niveles son elevados, especialmente el colesterol LDL, puede aumentar el riesgo cardiovascular debido a la acumulación de depósitos en las arterias.",
  },
  {
    id: 2,
    titulo: "¿Cómo controlar la ansiedad al comer?",
    imagen: "/images/comida-blog.jpg",
    descripcionCorta:
      "La alimentación también está relacionada con nuestras emociones y hábitos cotidianos.",
    descripcionLarga:
      "El abordaje de la alimentación compulsiva debe ser integral y adaptado a cada persona. La terapia cognitivo-conductual puede ayudar a identificar detonantes emocionales y modificar pensamientos relacionados con la comida. También pueden ser útiles estrategias de regulación emocional y atención plena. Desde la nutrición, se recomienda establecer horarios regulares y evitar restricciones extremas. Cuando existen dificultades persistentes, es importante consultar con profesionales de salud.",
  },
  {
    id: 3,
    titulo: "Vitamina para vegetarianos y veganos",
    imagen: "/images/vitaminas-blog.jpg",
    descripcionCorta:
      "Una alimentación vegetariana o vegana bien planificada puede aportar numerosos beneficios.",
    descripcionLarga:
      "Las dietas vegetarianas y veganas requieren una adecuada planificación nutricional. En las dietas veganas es especialmente importante contar con una fuente fiable de vitamina B12 mediante alimentos fortificados o suplementación. También es necesario considerar nutrientes como hierro, calcio, vitamina D, yodo y omega-3. Un nutricionista puede ayudar a adaptar la alimentación a las necesidades individuales.",
  },
];