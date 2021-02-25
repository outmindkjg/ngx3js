import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCameraLogarithmicdepthbufferComponent } from './webgl-camera-logarithmicdepthbuffer.component';

describe('WebglCameraLogarithmicdepthbufferComponent', () => {
  let component: WebglCameraLogarithmicdepthbufferComponent;
  let fixture: ComponentFixture<WebglCameraLogarithmicdepthbufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCameraLogarithmicdepthbufferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCameraLogarithmicdepthbufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
