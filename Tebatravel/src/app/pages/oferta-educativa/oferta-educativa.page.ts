import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QrScannerModalComponent } from './qr-scanner-modal/qr-scanner-modal.component';
import { AsistenciaService } from '../../services/asistencia.service';

interface Carrera {
  nombre: string;
  tsu?: string;
  imagen: string;
  escaneada: boolean;
  tipo: 'carrera' | 'maestria';
  id: number;
}

@Component({
  selector: 'app-oferta-educativa',
  templateUrl: './oferta-educativa.page.html',
  styleUrls: ['./oferta-educativa.page.scss'],
  standalone: false,
})
export class OfertaEducativaPage implements OnInit {
  carreras: Carrera[] = [
    { 
      id: 1,
      nombre: 'Ingeniería en Agricultura Sustentable y Protegida',
      tsu: 'TSU en Agricultura Sustentable y Protegida',
      imagen: 'assets/images/carrera-1.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 2,
      nombre: 'Ingeniería en Energía y Desarrollo Sostenible',
      tsu: 'TSU en Energía Turbo Solar',
      imagen: 'assets/images/carrera-2.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 3,
      nombre: 'Ingeniería en Alimentos',
      tsu: 'TSU en Tecnología de Alimentos',
      imagen: 'assets/images/carrera-3.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 4,
      nombre: 'Ingeniería en Mantenimiento Industrial',
      tsu: 'TSU en Mantenimiento Industrial',
      imagen: 'assets/images/carrera-4.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 5,
      nombre: 'Ingeniería en Mecatrónica',
      tsu: 'TSU en Automatización',
      imagen: 'assets/images/carrera-5.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 6,
      nombre: 'Ingeniería en Mecánica',
      tsu: 'TSU en Mecánica Automotriz',
      imagen: 'assets/images/carrera-6.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 7,
      nombre: 'Ingeniería en Tecnologías de la Información e Innovación Digital',
      tsu: 'TSU en Tecnologías de la Información (Área Infraestructura de Redes Digitales)',
      imagen: 'assets/images/carrera-7.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 8,
      nombre: 'Ingeniería en Tecnologías de la Información e Innovación Digital',
      tsu: 'TSU en Tecnologías de la Información (Área Desarrollo de Software Multiplataforma)',
      imagen: 'assets/images/carrera-8.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 9,
      nombre: 'Ingeniería en Tecnologías de la Información e Innovación Digital',
      tsu: 'TSU en Entornos Virtuales y Negocios Digitales',
      imagen: 'assets/images/carrera-9.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 10,
      nombre: 'Ingeniería en Nanotecnología',
      tsu: 'TSU en Nanotecnología',
      imagen: 'assets/images/carrera-10.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 11,
      nombre: 'Ingeniería en Logística',
      tsu: 'TSU en Cadena de Suministros',
      imagen: 'assets/images/carrera-11.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 12,
      nombre: 'Licenciatura en Negocios y Mercadotecnia',
      tsu: 'TSU en Mercadotecnia',
      imagen: 'assets/images/carrera-12.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 13,
      nombre: 'Licenciatura en Gastronomía',
      tsu: 'TSU en Gastronomía',
      imagen: 'assets/images/carrera-13.png',
      escaneada: false,
      tipo: 'carrera'
    },
    { 
      id: 14,
      nombre: 'Licenciatura en Gestión y Desarrollo Turístico',
      tsu: 'TSU en Turismo',
      imagen: 'assets/images/carrera-14.png',
      escaneada: false,
      tipo: 'carrera'
    }
  ];

  constructor(
    private modalCtrl: ModalController,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit() {
    this.cargarCarrerasEscaneadas();
    this.verificarYSincronizar();
  }

  cargarCarrerasEscaneadas() {
    const carrerasEscaneadas = localStorage.getItem('carrerasEscaneadas');
    if (carrerasEscaneadas) {
      const idsEscaneados = JSON.parse(carrerasEscaneadas);
      this.carreras = this.carreras.map(carrera => ({
        ...carrera,
        escaneada: idsEscaneados.includes(carrera.id)
      }));
    }
  }

  async verificarYSincronizar() {
    const hayInternet = await this.asistenciaService.checkInternetConnection();
    if (hayInternet) {
      this.asistenciaService.sincronizarAsistenciasPendientes().subscribe();
    }
  }

  async abrirScanner(index: number) {
    const carrera = this.carreras[index];
    if (carrera.escaneada) {
      // Mostrar mensaje de que ya fue escaneada
      return;
    }

    const modal = await this.modalCtrl.create({
      component: QrScannerModalComponent
    });

    modal.onDidDismiss().then(async result => {
      if (result.data && result.data.qr) {
        const asistencia = {
          FechaAsistencia: new Date().toISOString(),
          IdAlumno: 1, // Obtener el ID del alumno de donde corresponda
          IdCarrera: carrera.id
        };

        const hayInternet = await this.asistenciaService.checkInternetConnection();

        if (hayInternet) {
          this.asistenciaService.enviarAsistencia(asistencia).subscribe(
            response => {
              if (!response.error) {
                this.marcarCarreraComoEscaneada(carrera.id);
              }
            }
          );
        } else {
          this.asistenciaService.guardarAsistenciaLocal(asistencia);
          this.marcarCarreraComoEscaneada(carrera.id);
        }
      }
    });
    await modal.present();
  }

  marcarCarreraComoEscaneada(idCarrera: number) {
    // Actualizar el estado en memoria
    const carrera = this.carreras.find(c => c.id === idCarrera);
    if (carrera) {
      carrera.escaneada = true;
    }

    // Guardar en localStorage
    const carrerasEscaneadas = localStorage.getItem('carrerasEscaneadas');
    const idsEscaneados = carrerasEscaneadas ? JSON.parse(carrerasEscaneadas) : [];
    if (!idsEscaneados.includes(idCarrera)) {
      idsEscaneados.push(idCarrera);
      localStorage.setItem('carrerasEscaneadas', JSON.stringify(idsEscaneados));
    }
  }
}
