import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingGlitchComponent } from './webgl-postprocessing-glitch.component';

describe('WebglPostprocessingGlitchComponent', () => {
  let component: WebglPostprocessingGlitchComponent;
  let fixture: ComponentFixture<WebglPostprocessingGlitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingGlitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingGlitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
