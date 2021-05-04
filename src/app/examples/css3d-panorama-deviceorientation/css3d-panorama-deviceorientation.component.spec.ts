import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dPanoramaDeviceorientationComponent } from './css3d-panorama-deviceorientation.component';

describe('Css3dPanoramaDeviceorientationComponent', () => {
  let component: Css3dPanoramaDeviceorientationComponent;
  let fixture: ComponentFixture<Css3dPanoramaDeviceorientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css3dPanoramaDeviceorientationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dPanoramaDeviceorientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
