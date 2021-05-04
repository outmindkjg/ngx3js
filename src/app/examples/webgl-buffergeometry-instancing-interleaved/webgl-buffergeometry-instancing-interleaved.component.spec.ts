import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryInstancingInterleavedComponent } from './webgl-buffergeometry-instancing-interleaved.component';

describe('WebglBuffergeometryInstancingInterleavedComponent', () => {
  let component: WebglBuffergeometryInstancingInterleavedComponent;
  let fixture: ComponentFixture<WebglBuffergeometryInstancingInterleavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryInstancingInterleavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryInstancingInterleavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
