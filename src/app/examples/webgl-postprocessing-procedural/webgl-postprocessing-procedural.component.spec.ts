import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingProceduralComponent } from './webgl-postprocessing-procedural.component';

describe('WebglPostprocessingProceduralComponent', () => {
  let component: WebglPostprocessingProceduralComponent;
  let fixture: ComponentFixture<WebglPostprocessingProceduralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingProceduralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingProceduralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
