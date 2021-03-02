import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglEffectsParallaxbarrierComponent } from './webgl-effects-parallaxbarrier.component';

describe('WebglEffectsParallaxbarrierComponent', () => {
  let component: WebglEffectsParallaxbarrierComponent;
  let fixture: ComponentFixture<WebglEffectsParallaxbarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglEffectsParallaxbarrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglEffectsParallaxbarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
