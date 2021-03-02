import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureRgbmComponent } from './webgl-loader-texture-rgbm.component';

describe('WebglLoaderTextureRgbmComponent', () => {
  let component: WebglLoaderTextureRgbmComponent;
  let fixture: ComponentFixture<WebglLoaderTextureRgbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureRgbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureRgbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
