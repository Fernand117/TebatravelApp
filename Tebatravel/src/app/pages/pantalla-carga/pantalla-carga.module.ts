import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PantallaCargaPageRoutingModule } from './pantalla-carga-routing.module';

import { PantallaCargaPage } from './pantalla-carga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantallaCargaPageRoutingModule
  ],
  declarations: [PantallaCargaPage]
})
export class PantallaCargaPageModule {}
