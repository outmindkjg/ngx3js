import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGpgpuWaterComponent } from './webgl-gpgpu-water.component';

describe('WebglGpgpuWaterComponent', () => {
  let component: WebglGpgpuWaterComponent;
  let fixture: ComponentFixture<WebglGpgpuWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGpgpuWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGpgpuWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
