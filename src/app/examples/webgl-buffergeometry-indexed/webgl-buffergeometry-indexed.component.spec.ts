import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryIndexedComponent } from './webgl-buffergeometry-indexed.component';

describe('WebglBuffergeometryIndexedComponent', () => {
  let component: WebglBuffergeometryIndexedComponent;
  let fixture: ComponentFixture<WebglBuffergeometryIndexedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryIndexedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryIndexedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
