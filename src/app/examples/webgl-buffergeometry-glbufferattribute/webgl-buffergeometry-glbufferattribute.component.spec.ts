import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryGlbufferattributeComponent } from './webgl-buffergeometry-glbufferattribute.component';

describe('WebglBuffergeometryGlbufferattributeComponent', () => {
  let component: WebglBuffergeometryGlbufferattributeComponent;
  let fixture: ComponentFixture<WebglBuffergeometryGlbufferattributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryGlbufferattributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryGlbufferattributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
