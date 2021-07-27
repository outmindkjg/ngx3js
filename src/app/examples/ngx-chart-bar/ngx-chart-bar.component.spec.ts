import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartBarComponent } from './ngx-chart-bar.component';

describe('NgxChartBarComponent', () => {
  let component: NgxChartBarComponent;
  let fixture: ComponentFixture<NgxChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
