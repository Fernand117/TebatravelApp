import { Component } from '@angular/core';
import { QRStorageService } from './services/qr-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private qrStorageService: QRStorageService) {
    this.setupNetworkListener();
  }

  private setupNetworkListener() {
    window.addEventListener('online', () => {
      this.qrStorageService.syncPendingScans();
    });
  }
}
