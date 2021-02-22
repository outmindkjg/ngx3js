import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCameraComponent } from './webgl-camera.component';

describe('WebglCameraComponent', () => {
  let component: WebglCameraComponent;
  let fixture: ComponentFixture<WebglCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
