import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInteractivePointsComponent } from './webgl-interactive-points.component';

describe('WebglInteractivePointsComponent', () => {
  let component: WebglInteractivePointsComponent;
  let fixture: ComponentFixture<WebglInteractivePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInteractivePointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInteractivePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
