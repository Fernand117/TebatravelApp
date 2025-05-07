import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { LoginDTO } from 'src/app/models/login.dto';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  iniciarSesion() {
    const loginData: LoginDTO = {
      correo: this.usuario,
      password: this.contrasena
    };

    this.apiService.loginAlumno(loginData).subscribe({
      next: async (respuesta) => {
        // Guardar la data del alumno en localStorage
        localStorage.setItem('alumno', JSON.stringify(respuesta.data));

        // Mostrar el mensaje de éxito
        await this.mostrarExito(respuesta.mensaje);

        // Redirigir después de cerrar el alert
        this.router.navigateByUrl('/oferta-educativa');
      },
      error: (err) => {
        console.error('Error en login', err);
        const mensaje = err.error?.mensaje || 'Error desconocido';
        this.mostrarError(mensaje);
      }
    });
  }

  async mostrarExito(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡En hora buena!',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error de inicio de sesión',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
