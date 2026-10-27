export interface Region {
  nombre: string;
  comunas: string[];
}

export const regiones: Region[] = [
  {
    nombre: "Metropolitana",
    comunas: [
      "Santiago",
      "Providencia",
      "Las Condes",
    ],
  },
  {
    nombre: "La Araucanía",
    comunas: [
      "Temuco",
      "Carahue",
      "Cunco",
    ],
  },
];