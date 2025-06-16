import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BarcodeFormat } from '@zxing/library';
import { QRStorageService } from '../../../services/qr-storage.service';

interface QRCarreraData {
  id: number;
  nombre: string;
  tsu?: string;
  imagen: string;
  tipo: 'carrera' | 'maestria';
}

@Component({
  selector: 'app-qr-scanner-modal',
  templateUrl: './qr-scanner-modal.component.html',
  styleUrls: ['./qr-scanner-modal.component.scss'],
  standalone: false,
})
export class QrScannerModalComponent implements OnInit {
  allowedFormats = [BarcodeFormat.QR_CODE];
  hasPermission = false;
  availableCameras: MediaDeviceInfo[] = [];
  isCheckingPermissions = false;
  isHttpContext = window.location.protocol === 'http:';
  selectedDevice: MediaDeviceInfo | undefined;
  currentDevice: MediaDeviceInfo | undefined;
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private qrStorageService: QRStorageService
  ) {}

  ngOnInit() {
    console.log('Is HTTP Context:', this.isHttpContext);
    if (this.isHttpContext) {
      this.checkHttpContext();
    } else {
      this.checkPermissions();
    }
  }

  async checkHttpContext() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(device => device.kind === 'videoinput');
      
      if (!hasCamera) {
        await this.mostrarAlertaNoCamara();
        return;
      }

      // En HTTP, intentamos directamente solicitar la cámara
      await this.checkPermissions();
    } catch (err) {
      console.error('Error al verificar dispositivos:', err);
      await this.mostrarAlertaHTTP();
    }
  }

  async checkPermissions() {
    if (this.isCheckingPermissions) return;
    this.isCheckingPermissions = true;

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      this.availableCameras = cameras;
      
      // Si hay cámaras disponibles, seleccionar la primera por defecto
      if (cameras.length > 0) {
        this.selectedDevice = cameras[0];
      }

      const constraints = {
        video: {
          deviceId: this.selectedDevice ? { exact: this.selectedDevice.deviceId } : undefined,
          facingMode: 'environment'
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.hasPermission = true;
      stream.getTracks().forEach(track => track.stop());
      this.onCamerasFound(cameras);

    } catch (err: any) {
      console.error('Error al acceder a la cámara:', err);
      console.error('Camera access error details:', err.name, err.message, err); // More detailed error logging
      this.hasPermission = false;
      
      if (err.name === 'NotAllowedError') {
        await this.mostrarAlertaPermisoDenegado();
      } else if (err.name === 'NotFoundError') {
        await this.mostrarAlertaNoCamara();
      } else if (err.name === 'NotReadableError') {
        await this.mostrarAlertaCamaraEnUso();
      } else {
        await this.mostrarAlertaError(err.message);
      }
    } finally {
      this.isCheckingPermissions = false;
    }
  }

  async mostrarAlertaHTTP() {
    const alert = await this.alertController.create({
      header: 'Acceso a la Cámara en HTTP',
      message: 'Estás accediendo desde una conexión HTTP. Es posible que algunos navegadores restrinjan el acceso a la cámara. Si el escáner no funciona, intenta acceder desde Chrome en Android o Safari en iOS.',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  async mostrarAlertaPermisoDenegado() {
    const alert = await this.alertController.create({
      header: 'Permiso Denegado',
      message: 'Necesitamos acceso a tu cámara para escanear códigos QR. Por favor, permite el acceso en la configuración de tu navegador.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarAlertaNoCamara() {
    const alert = await this.alertController.create({
      header: 'Cámara No Encontrada',
      message: 'No se detectó ninguna cámara en tu dispositivo.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarAlertaCamaraEnUso() {
    const alert = await this.alertController.create({
      header: 'Cámara en Uso',
      message: 'La cámara está siendo utilizada por otra aplicación. Por favor, cierra otras aplicaciones que puedan estar usando la cámara.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarAlertaError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: `Hubo un problema al acceder a la cámara: ${mensaje}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async validateQRData(scannedData: string): Promise<boolean> {
    try {
      // Intentar parsear los datos del QR
      console.log('Scanned Data:', scannedData);
      const qrData: QRCarreraData = JSON.parse(scannedData);
      
      // Validar que el objeto tenga la estructura correcta
      if (!qrData.id || !qrData.nombre || !qrData.imagen || !qrData.tipo) {
        await this.mostrarAlertaError('QR inválido: formato incorrecto');
        return false;
      }
      
      // Aquí puedes agregar la validación contra el arreglo de carreras
      // Por ahora solo validamos la estructura
      return true;
    } catch (error) {
      console.error('Error al validar datos del QR:', error);
      console.error('Error object details:', error); // Log the full error object
      await this.mostrarAlertaError('QR inválido: no se pudo procesar el contenido');
      return false;
    }
  }

  async onCodeResult(resultString: string) {
    try {
      if (await this.validateQRData(resultString)) {
        await this.qrStorageService.saveQRScan(resultString);
        this.modalCtrl.dismiss({ qr: resultString });
      }
    } catch (error) {
      console.error('Error saving QR scan:', error);
      this.mostrarAlertaError('Error al guardar el escaneo QR');
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onCamerasFound(cameras: MediaDeviceInfo[]) {
    this.availableCameras = cameras;
    if (cameras.length === 0) {
      this.mostrarAlertaNoCamara();
    }
  }

  onScanError(error: Error) {
    console.error('Error al escanear:', error);
    this.mostrarAlertaError(error.message);
  }

  async changeCamera(device: MediaDeviceInfo) {
    this.selectedDevice = device;
    await this.checkPermissions();
  }
}