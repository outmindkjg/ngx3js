import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmapPerformanceComponent } from './webgl-shadowmap-performance.component';

describe('WebglShadowmapPerformanceComponent', () => {
  let component: WebglShadowmapPerformanceComponent;
  let fixture: ComponentFixture<WebglShadowmapPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmapPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmapPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
