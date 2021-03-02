import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightsPointlights2Component } from './webgl-lights-pointlights2.component';

describe('WebglLightsPointlights2Component', () => {
  let component: WebglLightsPointlights2Component;
  let fixture: ComponentFixture<WebglLightsPointlights2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightsPointlights2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightsPointlights2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
