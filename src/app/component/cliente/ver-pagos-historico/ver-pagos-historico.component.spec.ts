import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPagosHistoricoComponent } from './ver-pagos-historico.component';

describe('VerPagosHistoricoComponent', () => {
  let component: VerPagosHistoricoComponent;
  let fixture: ComponentFixture<VerPagosHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPagosHistoricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPagosHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
