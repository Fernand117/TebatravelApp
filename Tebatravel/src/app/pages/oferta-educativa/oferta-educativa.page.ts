import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QrScannerModalComponent } from './qr-scanner-modal/qr-scanner-modal.component';

interface Carrera {
  nombre: string;
  imagen: string;
  escaneada: boolean;
}

@Component({
  selector: 'app-oferta-educativa',
  templateUrl: './oferta-educativa.page.html',
  styleUrls: ['./oferta-educativa.page.scss'],
  standalone: false,
})
export class OfertaEducativaPage implements OnInit {
  carreras: Carrera[] = [
    { nombre: 'Agricultura Sustentable', imagen: 'assets/images/carrera-1.png', escaneada: false },
    { nombre: 'Desarrollo de Negocios', imagen: 'assets/images/carrera-2.png', escaneada: false },
    { nombre: 'Energías Renovables', imagen: 'assets/images/carrera-3.png', escaneada: false },
    { nombre: 'Gastronomía', imagen: 'assets/images/carrera-4.png', escaneada: false },
    { nombre: 'Gestión Integral de Riesgos', imagen: 'assets/images/carrera-5.png', escaneada: false },
    { nombre: 'Logística', imagen: 'assets/images/carrera-6.png', escaneada: false },
    { nombre: 'TI', imagen: 'assets/images/carrera-7.png', escaneada: false },
    { nombre: 'Mantenimiento Industrial', imagen: 'assets/images/carrera-8.png', escaneada: false },
    { nombre: 'Carrera 9', imagen: 'assets/images/carrera-9.png', escaneada: false },
    { nombre: 'Carrera 10', imagen: 'assets/images/carrera-10.png', escaneada: false }
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async abrirScanner(index: number) {
    const modal = await this.modalCtrl.create({
      component: QrScannerModalComponent
    });

    modal.onDidDismiss().then(result => {
      if (result.data && result.data.qr) {
        this.carreras[index].escaneada = true;
      }
    });

    await modal.present();
  }
}
