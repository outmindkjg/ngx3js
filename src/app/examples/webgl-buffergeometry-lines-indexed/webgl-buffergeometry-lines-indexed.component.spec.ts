import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryLinesIndexedComponent } from './webgl-buffergeometry-lines-indexed.component';

describe('WebglBuffergeometryLinesIndexedComponent', () => {
  let component: WebglBuffergeometryLinesIndexedComponent;
  let fixture: ComponentFixture<WebglBuffergeometryLinesIndexedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryLinesIndexedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryLinesIndexedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
