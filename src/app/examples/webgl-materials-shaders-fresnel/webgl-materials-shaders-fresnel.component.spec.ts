import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsShadersFresnelComponent } from './webgl-materials-shaders-fresnel.component';

describe('WebglMaterialsShadersFresnelComponent', () => {
  let component: WebglMaterialsShadersFresnelComponent;
  let fixture: ComponentFixture<WebglMaterialsShadersFresnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsShadersFresnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsShadersFresnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
