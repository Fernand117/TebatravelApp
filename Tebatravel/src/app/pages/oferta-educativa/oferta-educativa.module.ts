import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { OfertaEducativaPageRoutingModule } from './oferta-educativa-routing.module';

import { OfertaEducativaPage } from './oferta-educativa.page';
import { QrScannerModalComponent } from './qr-scanner-modal/qr-scanner-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertaEducativaPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [OfertaEducativaPage, QrScannerModalComponent]
})
export class OfertaEducativaPageModule {}
