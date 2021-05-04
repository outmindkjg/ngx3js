import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryRawshaderComponent } from './webgl-buffergeometry-rawshader.component';

describe('WebglBuffergeometryRawshaderComponent', () => {
  let component: WebglBuffergeometryRawshaderComponent;
  let fixture: ComponentFixture<WebglBuffergeometryRawshaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryRawshaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryRawshaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
