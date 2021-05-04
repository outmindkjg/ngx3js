import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebgpuSandboxComponent } from './webgpu-sandbox.component';

describe('WebgpuSandboxComponent', () => {
  let component: WebgpuSandboxComponent;
  let fixture: ComponentFixture<WebgpuSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebgpuSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebgpuSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
