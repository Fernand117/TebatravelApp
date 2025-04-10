import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pantalla-carga',
    loadChildren: () => import('./pages/pantalla-carga/pantalla-carga.module').then( m => m.PantallaCargaPageModule)
  },
  {
    path: '',
    redirectTo: 'pantalla-carga',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'oferta-educativa',
    loadChildren: () => import('./pages/oferta-educativa/oferta-educativa.module').then( m => m.OfertaEducativaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
