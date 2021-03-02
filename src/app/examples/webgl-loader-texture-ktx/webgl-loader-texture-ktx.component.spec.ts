import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureKtxComponent } from './webgl-loader-texture-ktx.component';

describe('WebglLoaderTextureKtxComponent', () => {
  let component: WebglLoaderTextureKtxComponent;
  let fixture: ComponentFixture<WebglLoaderTextureKtxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureKtxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureKtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
