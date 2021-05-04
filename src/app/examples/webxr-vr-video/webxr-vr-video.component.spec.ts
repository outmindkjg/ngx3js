import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrVideoComponent } from './webxr-vr-video.component';

describe('WebxrVrVideoComponent', () => {
  let component: WebxrVrVideoComponent;
  let fixture: ComponentFixture<WebxrVrVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
