import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryPointsInterleavedComponent } from './webgl-buffergeometry-points-interleaved.component';

describe('WebglBuffergeometryPointsInterleavedComponent', () => {
  let component: WebglBuffergeometryPointsInterleavedComponent;
  let fixture: ComponentFixture<WebglBuffergeometryPointsInterleavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryPointsInterleavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryPointsInterleavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
