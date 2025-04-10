import {Component, OnDestroy, OnInit} from '@angular/core';
import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import {ModalController} from "@ionic/angular";


@Component({
  selector: 'app-modal-scanner',
  templateUrl: './modal-scanner.component.html',
  styleUrls: ['./modal-scanner.component.scss'],
  standalone: false,
})
export class ModalScannerComponent  implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}
