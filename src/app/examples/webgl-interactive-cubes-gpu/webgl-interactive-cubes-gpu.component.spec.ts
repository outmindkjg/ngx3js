import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInteractiveCubesGpuComponent } from './webgl-interactive-cubes-gpu.component';

describe('WebglInteractiveCubesGpuComponent', () => {
  let component: WebglInteractiveCubesGpuComponent;
  let fixture: ComponentFixture<WebglInteractiveCubesGpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInteractiveCubesGpuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInteractiveCubesGpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
