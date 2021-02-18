import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglAnimationSkinningAdditiveBlendingComponent } from './webgl-animation-skinning-additive-blending.component';

describe('WebglAnimationSkinningAdditiveBlendingComponent', () => {
  let component: WebglAnimationSkinningAdditiveBlendingComponent;
  let fixture: ComponentFixture<WebglAnimationSkinningAdditiveBlendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglAnimationSkinningAdditiveBlendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglAnimationSkinningAdditiveBlendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
