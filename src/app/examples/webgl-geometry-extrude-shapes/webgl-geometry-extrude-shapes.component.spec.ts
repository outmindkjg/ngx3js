import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryExtrudeShapesComponent } from './webgl-geometry-extrude-shapes.component';

describe('WebglGeometryExtrudeShapesComponent', () => {
  let component: WebglGeometryExtrudeShapesComponent;
  let fixture: ComponentFixture<WebglGeometryExtrudeShapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryExtrudeShapesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryExtrudeShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
