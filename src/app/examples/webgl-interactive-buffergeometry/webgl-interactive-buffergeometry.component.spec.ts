import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInteractiveBuffergeometryComponent } from './webgl-interactive-buffergeometry.component';

describe('WebglInteractiveBuffergeometryComponent', () => {
  let component: WebglInteractiveBuffergeometryComponent;
  let fixture: ComponentFixture<WebglInteractiveBuffergeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInteractiveBuffergeometryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInteractiveBuffergeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
