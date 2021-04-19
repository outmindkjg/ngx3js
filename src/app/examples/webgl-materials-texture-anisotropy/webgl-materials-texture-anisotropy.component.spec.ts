import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsTextureAnisotropyComponent } from './webgl-materials-texture-anisotropy.component';

describe('WebglMaterialsTextureAnisotropyComponent', () => {
  let component: WebglMaterialsTextureAnisotropyComponent;
  let fixture: ComponentFixture<WebglMaterialsTextureAnisotropyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsTextureAnisotropyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsTextureAnisotropyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
