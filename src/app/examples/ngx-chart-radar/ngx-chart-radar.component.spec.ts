import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartRadarComponent } from './ngx-chart-radar.component';

describe('NgxChartRadarComponent', () => {
  let component: NgxChartRadarComponent;
  let fixture: ComponentFixture<NgxChartRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartRadarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
