import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryColorsComponent } from './webgl-geometry-colors.component';

describe('WebglGeometryColorsComponent', () => {
  let component: WebglGeometryColorsComponent;
  let fixture: ComponentFixture<WebglGeometryColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryColorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
