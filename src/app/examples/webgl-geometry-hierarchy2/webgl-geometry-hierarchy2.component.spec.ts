import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryHierarchy2Component } from './webgl-geometry-hierarchy2.component';

describe('WebglGeometryHierarchy2Component', () => {
  let component: WebglGeometryHierarchy2Component;
  let fixture: ComponentFixture<WebglGeometryHierarchy2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryHierarchy2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryHierarchy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
