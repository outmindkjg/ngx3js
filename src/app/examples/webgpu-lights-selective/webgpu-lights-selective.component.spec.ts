import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebgpuLightsSelectiveComponent } from './webgpu-lights-selective.component';

describe('WebgpuLightsSelectiveComponent', () => {
  let component: WebgpuLightsSelectiveComponent;
  let fixture: ComponentFixture<WebgpuLightsSelectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebgpuLightsSelectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebgpuLightsSelectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
