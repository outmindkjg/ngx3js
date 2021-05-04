import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingSmaaComponent } from './webgl-postprocessing-smaa.component';

describe('WebglPostprocessingSmaaComponent', () => {
  let component: WebglPostprocessingSmaaComponent;
  let fixture: ComponentFixture<WebglPostprocessingSmaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingSmaaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingSmaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
