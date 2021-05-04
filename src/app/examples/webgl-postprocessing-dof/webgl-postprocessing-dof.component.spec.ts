import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingDofComponent } from './webgl-postprocessing-dof.component';

describe('WebglPostprocessingDofComponent', () => {
  let component: WebglPostprocessingDofComponent;
  let fixture: ComponentFixture<WebglPostprocessingDofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingDofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingDofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
