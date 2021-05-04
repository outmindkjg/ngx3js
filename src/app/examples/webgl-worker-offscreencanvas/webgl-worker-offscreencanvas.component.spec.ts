import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglWorkerOffscreencanvasComponent } from './webgl-worker-offscreencanvas.component';

describe('WebglWorkerOffscreencanvasComponent', () => {
  let component: WebglWorkerOffscreencanvasComponent;
  let fixture: ComponentFixture<WebglWorkerOffscreencanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglWorkerOffscreencanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglWorkerOffscreencanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
