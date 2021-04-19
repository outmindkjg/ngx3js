import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCubemapMipmapsComponent } from './webgl-materials-cubemap-mipmaps.component';

describe('WebglMaterialsCubemapMipmapsComponent', () => {
  let component: WebglMaterialsCubemapMipmapsComponent;
  let fixture: ComponentFixture<WebglMaterialsCubemapMipmapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCubemapMipmapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCubemapMipmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
