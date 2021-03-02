import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryTerrainComponent } from './webgl-geometry-terrain.component';

describe('WebglGeometryTerrainComponent', () => {
  let component: WebglGeometryTerrainComponent;
  let fixture: ComponentFixture<WebglGeometryTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
