import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartLineComponent } from './ngx-chart-line.component';

describe('NgxChartLineComponent', () => {
  let component: NgxChartLineComponent;
  let fixture: ComponentFixture<NgxChartLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
