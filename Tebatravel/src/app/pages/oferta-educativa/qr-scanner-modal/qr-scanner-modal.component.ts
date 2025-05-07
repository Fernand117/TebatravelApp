import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner-modal',
  templateUrl: './qr-scanner-modal.component.html',
  styleUrls: ['./qr-scanner-modal.component.scss'],
  standalone: false,
})
export class QrScannerModalComponent {
  constructor(private modalCtrl: ModalController) {}

  onCodeResult(resultString: string) {
    this.modalCtrl.dismiss({ qr: resultString });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
} 