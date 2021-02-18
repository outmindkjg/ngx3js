import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglAnimationMultipleComponent } from './webgl-animation-multiple.component';

describe('WebglAnimationMultipleComponent', () => {
  let component: WebglAnimationMultipleComponent;
  let fixture: ComponentFixture<WebglAnimationMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglAnimationMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglAnimationMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
