import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglModifierCurveInstancedComponent } from './webgl-modifier-curve-instanced.component';

describe('WebglModifierCurveInstancedComponent', () => {
  let component: WebglModifierCurveInstancedComponent;
  let fixture: ComponentFixture<WebglModifierCurveInstancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglModifierCurveInstancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglModifierCurveInstancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
