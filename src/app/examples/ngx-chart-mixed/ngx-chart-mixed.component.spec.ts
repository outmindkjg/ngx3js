import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartMixedComponent } from './ngx-chart-mixed.component';

describe('NgxChartMixedComponent', () => {
  let component: NgxChartMixedComponent;
  let fixture: ComponentFixture<NgxChartMixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartMixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
