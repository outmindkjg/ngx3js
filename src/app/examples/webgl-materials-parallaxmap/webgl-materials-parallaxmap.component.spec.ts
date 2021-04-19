import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsParallaxmapComponent } from './webgl-materials-parallaxmap.component';

describe('WebglMaterialsParallaxmapComponent', () => {
  let component: WebglMaterialsParallaxmapComponent;
  let fixture: ComponentFixture<WebglMaterialsParallaxmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsParallaxmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsParallaxmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
