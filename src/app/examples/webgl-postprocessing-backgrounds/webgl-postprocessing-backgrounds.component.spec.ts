import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingBackgroundsComponent } from './webgl-postprocessing-backgrounds.component';

describe('WebglPostprocessingBackgroundsComponent', () => {
  let component: WebglPostprocessingBackgroundsComponent;
  let fixture: ComponentFixture<WebglPostprocessingBackgroundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingBackgroundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingBackgroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
