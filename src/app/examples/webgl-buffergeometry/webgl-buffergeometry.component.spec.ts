import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryComponent } from './webgl-buffergeometry.component';

describe('WebglBuffergeometryComponent', () => {
  let component: WebglBuffergeometryComponent;
  let fixture: ComponentFixture<WebglBuffergeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
