import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryTextStrokeComponent } from './webgl-geometry-text-stroke.component';

describe('WebglGeometryTextStrokeComponent', () => {
  let component: WebglGeometryTextStrokeComponent;
  let fixture: ComponentFixture<WebglGeometryTextStrokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryTextStrokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryTextStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
