import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglAnimationKeyframesComponent } from './webgl-animation-keyframes.component';

describe('WebglAnimationKeyframesComponent', () => {
  let component: WebglAnimationKeyframesComponent;
  let fixture: ComponentFixture<WebglAnimationKeyframesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglAnimationKeyframesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglAnimationKeyframesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
