import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingSsaaComponent } from './webgl-postprocessing-ssaa.component';

describe('WebglPostprocessingSsaaComponent', () => {
  let component: WebglPostprocessingSsaaComponent;
  let fixture: ComponentFixture<WebglPostprocessingSsaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingSsaaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingSsaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
