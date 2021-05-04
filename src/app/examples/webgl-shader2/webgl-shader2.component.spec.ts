import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShader2Component } from './webgl-shader2.component';

describe('WebglShader2Component', () => {
  let component: WebglShader2Component;
  let fixture: ComponentFixture<WebglShader2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShader2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
