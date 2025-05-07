export interface EscuelaEntity {
  escuelaId: number;
  nombreEscuela: string;
  clave: string;
  // alumno?: AlumnoEntity; // Evitamos recursividad
} 