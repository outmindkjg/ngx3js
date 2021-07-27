import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartAreaComponent } from './ngx-chart-area.component';

describe('NgxChartAreaComponent', () => {
  let component: NgxChartAreaComponent;
  let fixture: ComponentFixture<NgxChartAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
