import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometrySelectiveDrawComponent } from './webgl-buffergeometry-selective-draw.component';

describe('WebglBuffergeometrySelectiveDrawComponent', () => {
  let component: WebglBuffergeometrySelectiveDrawComponent;
  let fixture: ComponentFixture<WebglBuffergeometrySelectiveDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometrySelectiveDrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometrySelectiveDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
