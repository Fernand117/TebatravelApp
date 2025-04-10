import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertaEducativaPageRoutingModule } from './oferta-educativa-routing.module';

import { OfertaEducativaPage } from './oferta-educativa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertaEducativaPageRoutingModule
  ],
  declarations: [OfertaEducativaPage]
})
export class OfertaEducativaPageModule {}
