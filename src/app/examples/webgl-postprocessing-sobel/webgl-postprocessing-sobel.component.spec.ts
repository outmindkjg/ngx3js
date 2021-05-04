import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingSobelComponent } from './webgl-postprocessing-sobel.component';

describe('WebglPostprocessingSobelComponent', () => {
  let component: WebglPostprocessingSobelComponent;
  let fixture: ComponentFixture<WebglPostprocessingSobelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingSobelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingSobelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
