import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingTaaComponent } from './webgl-postprocessing-taa.component';

describe('WebglPostprocessingTaaComponent', () => {
  let component: WebglPostprocessingTaaComponent;
  let fixture: ComponentFixture<WebglPostprocessingTaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingTaaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingTaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
