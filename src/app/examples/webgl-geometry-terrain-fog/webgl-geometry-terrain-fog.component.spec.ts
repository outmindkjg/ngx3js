import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryTerrainFogComponent } from './webgl-geometry-terrain-fog.component';

describe('WebglGeometryTerrainFogComponent', () => {
  let component: WebglGeometryTerrainFogComponent;
  let fixture: ComponentFixture<WebglGeometryTerrainFogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryTerrainFogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryTerrainFogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
