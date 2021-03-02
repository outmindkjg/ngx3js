import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderMmdPoseComponent } from './webgl-loader-mmd-pose.component';

describe('WebglLoaderMmdPoseComponent', () => {
  let component: WebglLoaderMmdPoseComponent;
  let fixture: ComponentFixture<WebglLoaderMmdPoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderMmdPoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderMmdPoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
