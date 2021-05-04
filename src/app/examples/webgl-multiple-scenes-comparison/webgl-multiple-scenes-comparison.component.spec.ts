import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMultipleScenesComparisonComponent } from './webgl-multiple-scenes-comparison.component';

describe('WebglMultipleScenesComparisonComponent', () => {
  let component: WebglMultipleScenesComparisonComponent;
  let fixture: ComponentFixture<WebglMultipleScenesComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMultipleScenesComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMultipleScenesComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
