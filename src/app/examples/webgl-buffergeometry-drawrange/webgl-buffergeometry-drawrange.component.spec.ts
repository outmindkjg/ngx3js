import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryDrawrangeComponent } from './webgl-buffergeometry-drawrange.component';

describe('WebglBuffergeometryDrawrangeComponent', () => {
  let component: WebglBuffergeometryDrawrangeComponent;
  let fixture: ComponentFixture<WebglBuffergeometryDrawrangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryDrawrangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryDrawrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
