import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureHdrComponent } from './webgl-loader-texture-hdr.component';

describe('WebglLoaderTextureHdrComponent', () => {
  let component: WebglLoaderTextureHdrComponent;
  let fixture: ComponentFixture<WebglLoaderTextureHdrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureHdrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureHdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
