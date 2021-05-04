import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryLinesComponent } from './webgl-buffergeometry-lines.component';

describe('WebglBuffergeometryLinesComponent', () => {
  let component: WebglBuffergeometryLinesComponent;
  let fixture: ComponentFixture<WebglBuffergeometryLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
