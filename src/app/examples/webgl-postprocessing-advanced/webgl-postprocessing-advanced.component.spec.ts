import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingAdvancedComponent } from './webgl-postprocessing-advanced.component';

describe('WebglPostprocessingAdvancedComponent', () => {
  let component: WebglPostprocessingAdvancedComponent;
  let fixture: ComponentFixture<WebglPostprocessingAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingAdvancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
