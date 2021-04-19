import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsEnvmapsParallaxComponent } from './webgl-materials-envmaps-parallax.component';

describe('WebglMaterialsEnvmapsParallaxComponent', () => {
  let component: WebglMaterialsEnvmapsParallaxComponent;
  let fixture: ComponentFixture<WebglMaterialsEnvmapsParallaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsEnvmapsParallaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsEnvmapsParallaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
