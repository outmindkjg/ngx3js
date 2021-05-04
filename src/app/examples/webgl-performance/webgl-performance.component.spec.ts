import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPerformanceComponent } from './webgl-performance.component';

describe('WebglPerformanceComponent', () => {
  let component: WebglPerformanceComponent;
  let fixture: ComponentFixture<WebglPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
