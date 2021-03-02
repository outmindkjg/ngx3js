import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderGltfVariantsComponent } from './webgl-loader-gltf-variants.component';

describe('WebglLoaderGltfVariantsComponent', () => {
  let component: WebglLoaderGltfVariantsComponent;
  let fixture: ComponentFixture<WebglLoaderGltfVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderGltfVariantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderGltfVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
