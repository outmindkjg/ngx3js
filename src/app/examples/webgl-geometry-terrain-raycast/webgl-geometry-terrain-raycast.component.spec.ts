import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryTerrainRaycastComponent } from './webgl-geometry-terrain-raycast.component';

describe('WebglGeometryTerrainRaycastComponent', () => {
  let component: WebglGeometryTerrainRaycastComponent;
  let fixture: ComponentFixture<WebglGeometryTerrainRaycastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryTerrainRaycastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryTerrainRaycastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
