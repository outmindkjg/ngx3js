import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsPhysicalTransmissionComponent } from './webgl-materials-physical-transmission.component';

describe('WebglMaterialsPhysicalTransmissionComponent', () => {
  let component: WebglMaterialsPhysicalTransmissionComponent;
  let fixture: ComponentFixture<WebglMaterialsPhysicalTransmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsPhysicalTransmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsPhysicalTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
