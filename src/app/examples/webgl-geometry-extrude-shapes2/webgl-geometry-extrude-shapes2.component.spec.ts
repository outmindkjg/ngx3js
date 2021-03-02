import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryExtrudeShapes2Component } from './webgl-geometry-extrude-shapes2.component';

describe('WebglGeometryExtrudeShapes2Component', () => {
  let component: WebglGeometryExtrudeShapes2Component;
  let fixture: ComponentFixture<WebglGeometryExtrudeShapes2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryExtrudeShapes2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryExtrudeShapes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
