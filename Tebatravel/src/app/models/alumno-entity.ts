import { CarreraEntity } from './carrera-entity';
import { EscuelaEntity } from './escuela-entity';

export interface AlumnoEntity {
  alummnoId: number;
  nombre: string;
  paterno: string;
  materno: string;
  numCelular: string;
  fechaNacimiento: string;
  correo: string;
  password: string;
  carreraId: number;
  escuelaId: number;
  carrera: CarreraEntity;
  escuela: EscuelaEntity;
} 