import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryNormalsComponent } from './webgl-geometry-normals.component';

describe('WebglGeometryNormalsComponent', () => {
  let component: WebglGeometryNormalsComponent;
  let fixture: ComponentFixture<WebglGeometryNormalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryNormalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryNormalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
