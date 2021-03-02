import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInstancingPerformanceComponent } from './webgl-instancing-performance.component';

describe('WebglInstancingPerformanceComponent', () => {
  let component: WebglInstancingPerformanceComponent;
  let fixture: ComponentFixture<WebglInstancingPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInstancingPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInstancingPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
