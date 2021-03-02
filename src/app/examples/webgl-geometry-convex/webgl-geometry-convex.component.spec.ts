import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryConvexComponent } from './webgl-geometry-convex.component';

describe('WebglGeometryConvexComponent', () => {
  let component: WebglGeometryConvexComponent;
  let fixture: ComponentFixture<WebglGeometryConvexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryConvexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryConvexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
