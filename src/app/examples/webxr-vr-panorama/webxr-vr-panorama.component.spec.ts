import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrPanoramaComponent } from './webxr-vr-panorama.component';

describe('WebxrVrPanoramaComponent', () => {
  let component: WebxrVrPanoramaComponent;
  let fixture: ComponentFixture<WebxrVrPanoramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrPanoramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
