import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartPolarComponent } from './ngx-chart-polar.component';

describe('NgxChartPolarComponent', () => {
  let component: NgxChartPolarComponent;
  let fixture: ComponentFixture<NgxChartPolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartPolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartPolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
