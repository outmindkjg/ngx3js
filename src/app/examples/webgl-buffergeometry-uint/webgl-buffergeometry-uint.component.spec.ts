import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryUintComponent } from './webgl-buffergeometry-uint.component';

describe('WebglBuffergeometryUintComponent', () => {
  let component: WebglBuffergeometryUintComponent;
  let fixture: ComponentFixture<WebglBuffergeometryUintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryUintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryUintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
