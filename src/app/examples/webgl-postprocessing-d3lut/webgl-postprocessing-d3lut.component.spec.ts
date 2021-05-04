import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingD3lutComponent } from './webgl-postprocessing-d3lut.component';

describe('WebglPostprocessingD3lutComponent', () => {
  let component: WebglPostprocessingD3lutComponent;
  let fixture: ComponentFixture<WebglPostprocessingD3lutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingD3lutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingD3lutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
