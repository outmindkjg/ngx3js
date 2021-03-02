import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryHierarchyComponent } from './webgl-geometry-hierarchy.component';

describe('WebglGeometryHierarchyComponent', () => {
  let component: WebglGeometryHierarchyComponent;
  let fixture: ComponentFixture<WebglGeometryHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryHierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
