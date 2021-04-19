import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsTextureRotationComponent } from './webgl-materials-texture-rotation.component';

describe('WebglMaterialsTextureRotationComponent', () => {
  let component: WebglMaterialsTextureRotationComponent;
  let fixture: ComponentFixture<WebglMaterialsTextureRotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsTextureRotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsTextureRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
