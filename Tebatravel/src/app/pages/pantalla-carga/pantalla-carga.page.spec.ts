import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallaCargaPage } from './pantalla-carga.page';

describe('PantallaCargaPage', () => {
  let component: PantallaCargaPage;
  let fixture: ComponentFixture<PantallaCargaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaCargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
