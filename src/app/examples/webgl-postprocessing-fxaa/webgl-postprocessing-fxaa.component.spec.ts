import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingFxaaComponent } from './webgl-postprocessing-fxaa.component';

describe('WebglPostprocessingFxaaComponent', () => {
  let component: WebglPostprocessingFxaaComponent;
  let fixture: ComponentFixture<WebglPostprocessingFxaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingFxaaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingFxaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
