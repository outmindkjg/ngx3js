import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryInstancingComponent } from './webgl-buffergeometry-instancing.component';

describe('WebglBuffergeometryInstancingComponent', () => {
  let component: WebglBuffergeometryInstancingComponent;
  let fixture: ComponentFixture<WebglBuffergeometryInstancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryInstancingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryInstancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
