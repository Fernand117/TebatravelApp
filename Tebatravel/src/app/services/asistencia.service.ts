import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = `${environment.apiUrl}/Asistencia`;

  constructor(private http: HttpClient) {}

  async checkInternetConnection(): Promise<boolean> {
    try {
      const response = await fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors',
      });
      return true;
    } catch {
      return false;
    }
  }

  guardarAsistenciaLocal(asistencia: any): void {
    const asistenciasPendientes = this.obtenerAsistenciasPendientes();
    asistenciasPendientes.push(asistencia);
    localStorage.setItem('asistenciasPendientes', JSON.stringify(asistenciasPendientes));
  }

  obtenerAsistenciasPendientes(): any[] {
    const asistencias = localStorage.getItem('asistenciasPendientes');
    return asistencias ? JSON.parse(asistencias) : [];
  }

  enviarAsistencia(asistencia: any): Observable<any> {
    return this.http.post(this.apiUrl, asistencia).pipe(
      catchError(error => {
        this.guardarAsistenciaLocal(asistencia);
        return of({ error: true, mensaje: 'Error al enviar asistencia' });
      })
    );
  }

  sincronizarAsistenciasPendientes(): Observable<any> {
    const asistenciasPendientes = this.obtenerAsistenciasPendientes();
    if (asistenciasPendientes.length === 0) {
      return of({ mensaje: 'No hay asistencias pendientes' });
    }

    const promesas = asistenciasPendientes.map(asistencia =>
      this.http.post(this.apiUrl, asistencia).toPromise()
    );

    return from(Promise.all(promesas)).pipe(
      map(() => {
        localStorage.removeItem('asistenciasPendientes');
        return { mensaje: 'Asistencias sincronizadas correctamente' };
      }),
      catchError(error => of({ error: true, mensaje: 'Error al sincronizar asistencias' }))
    );
  }
}