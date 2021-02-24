import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCameraCinematicComponent } from './webgl-camera-cinematic.component';

describe('WebglCameraCinematicComponent', () => {
  let component: WebglCameraCinematicComponent;
  let fixture: ComponentFixture<WebglCameraCinematicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCameraCinematicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCameraCinematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
