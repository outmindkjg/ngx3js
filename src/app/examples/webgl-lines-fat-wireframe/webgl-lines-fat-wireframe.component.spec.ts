import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLinesFatWireframeComponent } from './webgl-lines-fat-wireframe.component';

describe('WebglLinesFatWireframeComponent', () => {
  let component: WebglLinesFatWireframeComponent;
  let fixture: ComponentFixture<WebglLinesFatWireframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLinesFatWireframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLinesFatWireframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
