import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMathObbComponent } from './webgl-math-obb.component';

describe('WebglMathObbComponent', () => {
  let component: WebglMathObbComponent;
  let fixture: ComponentFixture<WebglMathObbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMathObbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMathObbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
