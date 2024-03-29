import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosDetalleComponentComponent } from './vuelos-detalle-component.component';

describe('VuelosDetalleComponentComponent', () => {
  let component: VuelosDetalleComponentComponent;
  let fixture: ComponentFixture<VuelosDetalleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosDetalleComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VuelosDetalleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
