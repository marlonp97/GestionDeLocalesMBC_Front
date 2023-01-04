import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLocalesComponent } from './ver-locales.component';

describe('VerLocalesComponent', () => {
  let component: VerLocalesComponent;
  let fixture: ComponentFixture<VerLocalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerLocalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
