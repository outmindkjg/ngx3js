import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryShapesComponent } from './webgl-geometry-shapes.component';

describe('WebglGeometryShapesComponent', () => {
  let component: WebglGeometryShapesComponent;
  let fixture: ComponentFixture<WebglGeometryShapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryShapesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
