import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryTeapotComponent } from './webgl-geometry-teapot.component';

describe('WebglGeometryTeapotComponent', () => {
  let component: WebglGeometryTeapotComponent;
  let fixture: ComponentFixture<WebglGeometryTeapotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryTeapotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryTeapotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
