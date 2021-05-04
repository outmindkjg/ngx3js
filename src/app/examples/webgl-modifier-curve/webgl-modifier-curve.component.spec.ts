import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglModifierCurveComponent } from './webgl-modifier-curve.component';

describe('WebglModifierCurveComponent', () => {
  let component: WebglModifierCurveComponent;
  let fixture: ComponentFixture<WebglModifierCurveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglModifierCurveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglModifierCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
