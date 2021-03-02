import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryTextShapesComponent } from './webgl-geometry-text-shapes.component';

describe('WebglGeometryTextShapesComponent', () => {
  let component: WebglGeometryTextShapesComponent;
  let fixture: ComponentFixture<WebglGeometryTextShapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryTextShapesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryTextShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
