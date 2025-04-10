import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertaEducativaPage } from './oferta-educativa.page';

describe('OfertaEducativaPage', () => {
  let component: OfertaEducativaPage;
  let fixture: ComponentFixture<OfertaEducativaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaEducativaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
