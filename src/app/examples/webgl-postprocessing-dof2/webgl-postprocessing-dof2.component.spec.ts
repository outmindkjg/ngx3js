import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingDof2Component } from './webgl-postprocessing-dof2.component';

describe('WebglPostprocessingDof2Component', () => {
  let component: WebglPostprocessingDof2Component;
  let fixture: ComponentFixture<WebglPostprocessingDof2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingDof2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingDof2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
