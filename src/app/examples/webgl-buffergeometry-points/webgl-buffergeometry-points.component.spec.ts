import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryPointsComponent } from './webgl-buffergeometry-points.component';

describe('WebglBuffergeometryPointsComponent', () => {
  let component: WebglBuffergeometryPointsComponent;
  let fixture: ComponentFixture<WebglBuffergeometryPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
