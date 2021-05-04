import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingUnrealBloomSelectiveComponent } from './webgl-postprocessing-unreal-bloom-selective.component';

describe('WebglPostprocessingUnrealBloomSelectiveComponent', () => {
  let component: WebglPostprocessingUnrealBloomSelectiveComponent;
  let fixture: ComponentFixture<WebglPostprocessingUnrealBloomSelectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingUnrealBloomSelectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingUnrealBloomSelectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
