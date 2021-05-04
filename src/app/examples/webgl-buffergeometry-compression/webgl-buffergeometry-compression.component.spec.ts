import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryCompressionComponent } from './webgl-buffergeometry-compression.component';

describe('WebglBuffergeometryCompressionComponent', () => {
  let component: WebglBuffergeometryCompressionComponent;
  let fixture: ComponentFixture<WebglBuffergeometryCompressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryCompressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryCompressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
