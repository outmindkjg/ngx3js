import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMultipleCanvasesComplexComponent } from './webgl-multiple-canvases-complex.component';

describe('WebglMultipleCanvasesComplexComponent', () => {
  let component: WebglMultipleCanvasesComplexComponent;
  let fixture: ComponentFixture<WebglMultipleCanvasesComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMultipleCanvasesComplexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMultipleCanvasesComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
