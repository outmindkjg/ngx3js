import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadersOcean2Component } from './webgl-shaders-ocean2.component';

describe('WebglShadersOcean2Component', () => {
  let component: WebglShadersOcean2Component;
  let fixture: ComponentFixture<WebglShadersOcean2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadersOcean2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadersOcean2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
