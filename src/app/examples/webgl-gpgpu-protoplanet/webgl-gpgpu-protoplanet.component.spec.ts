import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGpgpuProtoplanetComponent } from './webgl-gpgpu-protoplanet.component';

describe('WebglGpgpuProtoplanetComponent', () => {
  let component: WebglGpgpuProtoplanetComponent;
  let fixture: ComponentFixture<WebglGpgpuProtoplanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGpgpuProtoplanetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGpgpuProtoplanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
