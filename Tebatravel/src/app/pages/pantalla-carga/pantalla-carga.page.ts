import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-carga',
  templateUrl: './pantalla-carga.page.html',
  styleUrls: ['./pantalla-carga.page.scss'],
  standalone: false,
})
export class PantallaCargaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000); // 3 segundos
  }

}
