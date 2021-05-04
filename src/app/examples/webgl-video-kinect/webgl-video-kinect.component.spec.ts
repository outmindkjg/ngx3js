import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglVideoKinectComponent } from './webgl-video-kinect.component';

describe('WebglVideoKinectComponent', () => {
  let component: WebglVideoKinectComponent;
  let fixture: ComponentFixture<WebglVideoKinectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglVideoKinectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglVideoKinectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
