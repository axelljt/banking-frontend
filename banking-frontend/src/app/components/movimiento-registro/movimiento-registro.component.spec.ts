import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoRegistroComponent } from './movimiento-registro.component';

describe('MovimientoRegistroComponent', () => {
  let component: MovimientoRegistroComponent;
  let fixture: ComponentFixture<MovimientoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
