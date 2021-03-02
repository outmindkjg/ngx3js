import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderGltfCompressedComponent } from './webgl-loader-gltf-compressed.component';

describe('WebglLoaderGltfCompressedComponent', () => {
  let component: WebglLoaderGltfCompressedComponent;
  let fixture: ComponentFixture<WebglLoaderGltfCompressedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderGltfCompressedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderGltfCompressedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
