import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPerformanceStaticComponent } from './webgl-performance-static.component';

describe('WebglPerformanceStaticComponent', () => {
  let component: WebglPerformanceStaticComponent;
  let fixture: ComponentFixture<WebglPerformanceStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPerformanceStaticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPerformanceStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
