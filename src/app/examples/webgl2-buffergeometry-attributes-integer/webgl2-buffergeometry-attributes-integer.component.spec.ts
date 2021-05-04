import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2BuffergeometryAttributesIntegerComponent } from './webgl2-buffergeometry-attributes-integer.component';

describe('Webgl2BuffergeometryAttributesIntegerComponent', () => {
  let component: Webgl2BuffergeometryAttributesIntegerComponent;
  let fixture: ComponentFixture<Webgl2BuffergeometryAttributesIntegerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2BuffergeometryAttributesIntegerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2BuffergeometryAttributesIntegerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
