import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingComponent } from './webgl-postprocessing.component';

describe('WebglPostprocessingComponent', () => {
  let component: WebglPostprocessingComponent;
  let fixture: ComponentFixture<WebglPostprocessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
