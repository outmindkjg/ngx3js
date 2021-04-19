import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsVideoWebcamComponent } from './webgl-materials-video-webcam.component';

describe('WebglMaterialsVideoWebcamComponent', () => {
  let component: WebglMaterialsVideoWebcamComponent;
  let fixture: ComponentFixture<WebglMaterialsVideoWebcamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsVideoWebcamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsVideoWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
