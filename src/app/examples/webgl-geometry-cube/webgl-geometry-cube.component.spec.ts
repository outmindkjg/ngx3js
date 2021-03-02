import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryCubeComponent } from './webgl-geometry-cube.component';

describe('WebglGeometryCubeComponent', () => {
  let component: WebglGeometryCubeComponent;
  let fixture: ComponentFixture<WebglGeometryCubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryCubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
