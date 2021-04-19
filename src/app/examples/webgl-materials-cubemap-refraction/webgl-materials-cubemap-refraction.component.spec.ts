import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCubemapRefractionComponent } from './webgl-materials-cubemap-refraction.component';

describe('WebglMaterialsCubemapRefractionComponent', () => {
  let component: WebglMaterialsCubemapRefractionComponent;
  let fixture: ComponentFixture<WebglMaterialsCubemapRefractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCubemapRefractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCubemapRefractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
