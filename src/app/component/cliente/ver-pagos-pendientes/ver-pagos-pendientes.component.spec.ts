import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPagosPendientesComponent } from './ver-pagos-pendientes.component';

describe('VerPagosPendientesComponent', () => {
  let component: VerPagosPendientesComponent;
  let fixture: ComponentFixture<VerPagosPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPagosPendientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPagosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
