import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMultipleCanvasesCircleComponent } from './webgl-multiple-canvases-circle.component';

describe('WebglMultipleCanvasesCircleComponent', () => {
  let component: WebglMultipleCanvasesCircleComponent;
  let fixture: ComponentFixture<WebglMultipleCanvasesCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMultipleCanvasesCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMultipleCanvasesCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
