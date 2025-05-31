import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface QRScanData {
  qrCode: string;
  timestamp: number;
  synced: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QRStorageService {
  private readonly STORAGE_KEY = 'pending_qr_scans';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async saveQRScan(qrCode: string): Promise<void> {
    const scanData: QRScanData = {
      qrCode,
      timestamp: Date.now(),
      synced: false
    };

    const storedScans = await this.getStoredScans();
    storedScans.push(scanData);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storedScans));

    this.syncPendingScans();
  }

  private async getStoredScans(): Promise<QRScanData[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  async syncPendingScans(): Promise<void> {
    if (!navigator.onLine) return;

    const storedScans = await this.getStoredScans();
    const unsynced = storedScans.filter(scan => !scan.synced);

    for (const scan of unsynced) {
      try {
        await this.sendQRToServer(scan.qrCode).toPromise();
        scan.synced = true;
      } catch (error) {
        console.error('Error syncing QR:', error);
      }
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storedScans));
  }

  private sendQRToServer(qrCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/QR/scan`, { qrCode });
  }
}