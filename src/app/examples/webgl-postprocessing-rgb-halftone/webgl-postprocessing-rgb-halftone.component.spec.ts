import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingRgbHalftoneComponent } from './webgl-postprocessing-rgb-halftone.component';

describe('WebglPostprocessingRgbHalftoneComponent', () => {
  let component: WebglPostprocessingRgbHalftoneComponent;
  let fixture: ComponentFixture<WebglPostprocessingRgbHalftoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingRgbHalftoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingRgbHalftoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
