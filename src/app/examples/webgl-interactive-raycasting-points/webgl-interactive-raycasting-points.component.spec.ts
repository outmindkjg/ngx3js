import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInteractiveRaycastingPointsComponent } from './webgl-interactive-raycasting-points.component';

describe('WebglInteractiveRaycastingPointsComponent', () => {
  let component: WebglInteractiveRaycastingPointsComponent;
  let fixture: ComponentFixture<WebglInteractiveRaycastingPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInteractiveRaycastingPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInteractiveRaycastingPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
