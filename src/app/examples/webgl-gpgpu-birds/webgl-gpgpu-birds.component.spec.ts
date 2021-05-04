import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGpgpuBirdsComponent } from './webgl-gpgpu-birds.component';

describe('WebglGpgpuBirdsComponent', () => {
  let component: WebglGpgpuBirdsComponent;
  let fixture: ComponentFixture<WebglGpgpuBirdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGpgpuBirdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGpgpuBirdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
