import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryNurbsComponent } from './webgl-geometry-nurbs.component';

describe('WebglGeometryNurbsComponent', () => {
  let component: WebglGeometryNurbsComponent;
  let fixture: ComponentFixture<WebglGeometryNurbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryNurbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryNurbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
