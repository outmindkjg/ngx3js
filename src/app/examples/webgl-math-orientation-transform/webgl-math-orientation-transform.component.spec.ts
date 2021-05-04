import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMathOrientationTransformComponent } from './webgl-math-orientation-transform.component';

describe('WebglMathOrientationTransformComponent', () => {
  let component: WebglMathOrientationTransformComponent;
  let fixture: ComponentFixture<WebglMathOrientationTransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMathOrientationTransformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMathOrientationTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
