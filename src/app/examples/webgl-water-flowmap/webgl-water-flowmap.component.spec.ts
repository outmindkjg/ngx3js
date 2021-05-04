import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglWaterFlowmapComponent } from './webgl-water-flowmap.component';

describe('WebglWaterFlowmapComponent', () => {
  let component: WebglWaterFlowmapComponent;
  let fixture: ComponentFixture<WebglWaterFlowmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglWaterFlowmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglWaterFlowmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
