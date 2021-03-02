import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureKtx2Component } from './webgl-loader-texture-ktx2.component';

describe('WebglLoaderTextureKtx2Component', () => {
  let component: WebglLoaderTextureKtx2Component;
  let fixture: ComponentFixture<WebglLoaderTextureKtx2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureKtx2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureKtx2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
