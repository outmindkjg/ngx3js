import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrPanoramaDepthComponent } from './webxr-vr-panorama-depth.component';

describe('WebxrVrPanoramaDepthComponent', () => {
  let component: WebxrVrPanoramaDepthComponent;
  let fixture: ComponentFixture<WebxrVrPanoramaDepthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrPanoramaDepthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrPanoramaDepthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
