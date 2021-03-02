import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometrySplineEditorComponent } from './webgl-geometry-spline-editor.component';

describe('WebglGeometrySplineEditorComponent', () => {
  let component: WebglGeometrySplineEditorComponent;
  let fixture: ComponentFixture<WebglGeometrySplineEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometrySplineEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometrySplineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
