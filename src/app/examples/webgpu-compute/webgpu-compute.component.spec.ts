import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebgpuComputeComponent } from './webgpu-compute.component';

describe('WebgpuComputeComponent', () => {
  let component: WebgpuComputeComponent;
  let fixture: ComponentFixture<WebgpuComputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebgpuComputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebgpuComputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
