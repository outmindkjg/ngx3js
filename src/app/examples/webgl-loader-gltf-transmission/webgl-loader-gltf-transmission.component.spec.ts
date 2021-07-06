import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderGltfTransmissionComponent } from './webgl-loader-gltf-transmission.component';

describe('WebglLoaderGltfTransmissionComponent', () => {
  let component: WebglLoaderGltfTransmissionComponent;
  let fixture: ComponentFixture<WebglLoaderGltfTransmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderGltfTransmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderGltfTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
