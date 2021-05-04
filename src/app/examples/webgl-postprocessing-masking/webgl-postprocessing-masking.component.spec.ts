import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingMaskingComponent } from './webgl-postprocessing-masking.component';

describe('WebglPostprocessingMaskingComponent', () => {
  let component: WebglPostprocessingMaskingComponent;
  let fixture: ComponentFixture<WebglPostprocessingMaskingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingMaskingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingMaskingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
