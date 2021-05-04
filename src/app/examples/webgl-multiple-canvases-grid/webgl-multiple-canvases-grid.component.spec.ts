import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMultipleCanvasesGridComponent } from './webgl-multiple-canvases-grid.component';

describe('WebglMultipleCanvasesGridComponent', () => {
  let component: WebglMultipleCanvasesGridComponent;
  let fixture: ComponentFixture<WebglMultipleCanvasesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMultipleCanvasesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMultipleCanvasesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
