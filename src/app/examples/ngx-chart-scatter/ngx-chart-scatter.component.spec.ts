import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartScatterComponent } from './ngx-chart-scatter.component';

describe('NgxChartScatterComponent', () => {
  let component: NgxChartScatterComponent;
  let fixture: ComponentFixture<NgxChartScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartScatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
