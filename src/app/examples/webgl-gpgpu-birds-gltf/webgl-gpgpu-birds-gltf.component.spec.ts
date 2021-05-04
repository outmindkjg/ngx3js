import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGpgpuBirdsGltfComponent } from './webgl-gpgpu-birds-gltf.component';

describe('WebglGpgpuBirdsGltfComponent', () => {
  let component: WebglGpgpuBirdsGltfComponent;
  let fixture: ComponentFixture<WebglGpgpuBirdsGltfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGpgpuBirdsGltfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGpgpuBirdsGltfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
