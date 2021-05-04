import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingOutlineComponent } from './webgl-postprocessing-outline.component';

describe('WebglPostprocessingOutlineComponent', () => {
  let component: WebglPostprocessingOutlineComponent;
  let fixture: ComponentFixture<WebglPostprocessingOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
