import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglAnimationSkinningBlendingComponent } from './webgl-animation-skinning-blending.component';

describe('WebglAnimationSkinningBlendingComponent', () => {
  let component: WebglAnimationSkinningBlendingComponent;
  let fixture: ComponentFixture<WebglAnimationSkinningBlendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglAnimationSkinningBlendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglAnimationSkinningBlendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
