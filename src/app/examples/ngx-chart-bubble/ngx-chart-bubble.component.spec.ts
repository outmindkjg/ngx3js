import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartBubbleComponent } from './ngx-chart-bubble.component';

describe('NgxChartBubbleComponent', () => {
  let component: NgxChartBubbleComponent;
  let fixture: ComponentFixture<NgxChartBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
