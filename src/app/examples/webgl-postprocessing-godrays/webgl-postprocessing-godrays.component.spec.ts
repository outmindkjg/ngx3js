import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingGodraysComponent } from './webgl-postprocessing-godrays.component';

describe('WebglPostprocessingGodraysComponent', () => {
  let component: WebglPostprocessingGodraysComponent;
  let fixture: ComponentFixture<WebglPostprocessingGodraysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingGodraysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingGodraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
