import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureExrComponent } from './webgl-loader-texture-exr.component';

describe('WebglLoaderTextureExrComponent', () => {
  let component: WebglLoaderTextureExrComponent;
  let fixture: ComponentFixture<WebglLoaderTextureExrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureExrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureExrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
