import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryDynamicComponent } from './webgl-geometry-dynamic.component';

describe('WebglGeometryDynamicComponent', () => {
  let component: WebglGeometryDynamicComponent;
  let fixture: ComponentFixture<WebglGeometryDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
