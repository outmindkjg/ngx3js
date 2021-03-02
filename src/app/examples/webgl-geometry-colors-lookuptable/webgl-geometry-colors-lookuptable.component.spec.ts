import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryColorsLookuptableComponent } from './webgl-geometry-colors-lookuptable.component';

describe('WebglGeometryColorsLookuptableComponent', () => {
  let component: WebglGeometryColorsLookuptableComponent;
  let fixture: ComponentFixture<WebglGeometryColorsLookuptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryColorsLookuptableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryColorsLookuptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
