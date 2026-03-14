import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBancariaComponent } from './gestion-bancaria.component';

describe('GestionBancariaComponent', () => {
  let component: GestionBancariaComponent;
  let fixture: ComponentFixture<GestionBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBancariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
