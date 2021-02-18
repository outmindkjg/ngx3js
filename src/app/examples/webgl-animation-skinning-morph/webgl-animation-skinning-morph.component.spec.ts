import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglAnimationSkinningMorphComponent } from './webgl-animation-skinning-morph.component';

describe('WebglAnimationSkinningMorphComponent', () => {
  let component: WebglAnimationSkinningMorphComponent;
  let fixture: ComponentFixture<WebglAnimationSkinningMorphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglAnimationSkinningMorphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglAnimationSkinningMorphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
