import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderGltfComponent } from './webgl-loader-gltf.component';

describe('WebglLoaderGltfComponent', () => {
  let component: WebglLoaderGltfComponent;
  let fixture: ComponentFixture<WebglLoaderGltfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderGltfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderGltfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
