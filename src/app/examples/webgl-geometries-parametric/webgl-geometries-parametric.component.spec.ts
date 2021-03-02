import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometriesParametricComponent } from './webgl-geometries-parametric.component';

describe('WebglGeometriesParametricComponent', () => {
  let component: WebglGeometriesParametricComponent;
  let fixture: ComponentFixture<WebglGeometriesParametricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometriesParametricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometriesParametricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
