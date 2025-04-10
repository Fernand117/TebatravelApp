import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertaEducativaPage } from './oferta-educativa.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaEducativaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertaEducativaPageRoutingModule {}
