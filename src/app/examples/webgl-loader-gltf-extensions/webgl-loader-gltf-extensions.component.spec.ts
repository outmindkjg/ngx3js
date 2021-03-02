import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderGltfExtensionsComponent } from './webgl-loader-gltf-extensions.component';

describe('WebglLoaderGltfExtensionsComponent', () => {
  let component: WebglLoaderGltfExtensionsComponent;
  let fixture: ComponentFixture<WebglLoaderGltfExtensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderGltfExtensionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderGltfExtensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
