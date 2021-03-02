import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryExtrudeSplinesComponent } from './webgl-geometry-extrude-splines.component';

describe('WebglGeometryExtrudeSplinesComponent', () => {
  let component: WebglGeometryExtrudeSplinesComponent;
  let fixture: ComponentFixture<WebglGeometryExtrudeSplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryExtrudeSplinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryExtrudeSplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
