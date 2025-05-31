import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlumnoRegistroDTO } from '../models/alumno-registro.dto';
import { AlumnoEntity } from '../models/alumno-entity';
import { LoginDTO } from '../models/login.dto';
import { CarreraEntity } from '../models/carrera-entity';
import { EscuelaEntity } from '../models/escuela-entity';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = environment.apiUrl;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Alumno
  crearAlumno(alumno: AlumnoRegistroDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/Alumno`, alumno);
  }

  obtenerAlumnos(): Observable<AlumnoEntity[]> {
    return this.http.get<AlumnoEntity[]>(`${this.apiUrl}/Alumno`);
  }

  actualizarAlumno(id: number, alumno: AlumnoRegistroDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/Alumno/${id}`, alumno);
  }

  obtenerAlumnoPorId(id: number): Observable<AlumnoEntity> {
    return this.http.get<AlumnoEntity>(`${this.apiUrl}/Alumno/${id}`);
  }

  loginAlumno(login: LoginDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/Alumno/login`, login);
  }

  // Carrera
  obtenerCarreras(): Observable<CarreraEntity[]> {
    return this.http.get<CarreraEntity[]>(`${this.apiUrl}/Carrera`);
  }

  obtenerCarreraPorId(id: number): Observable<CarreraEntity> {
    return this.http.get<CarreraEntity>(`${this.apiUrl}/Carrera/${id}`);
  }

  // Escuela
  obtenerEscuelas(): Observable<EscuelaEntity[]> {
    return this.http.get<EscuelaEntity[]>(`${this.apiUrl}/Escuela`);
  }

  obtenerEscuelaPorId(id: number): Observable<EscuelaEntity> {
    return this.http.get<EscuelaEntity>(`${this.apiUrl}/Escuela/${id}`);
  }
}
