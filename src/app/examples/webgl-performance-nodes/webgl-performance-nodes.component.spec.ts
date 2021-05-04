import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPerformanceNodesComponent } from './webgl-performance-nodes.component';

describe('WebglPerformanceNodesComponent', () => {
  let component: WebglPerformanceNodesComponent;
  let fixture: ComponentFixture<WebglPerformanceNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPerformanceNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPerformanceNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
