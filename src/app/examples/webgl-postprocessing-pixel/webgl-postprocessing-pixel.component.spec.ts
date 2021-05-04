import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingPixelComponent } from './webgl-postprocessing-pixel.component';

describe('WebglPostprocessingPixelComponent', () => {
  let component: WebglPostprocessingPixelComponent;
  let fixture: ComponentFixture<WebglPostprocessingPixelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingPixelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingPixelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
