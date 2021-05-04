import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingCrossfadeComponent } from './webgl-postprocessing-crossfade.component';

describe('WebglPostprocessingCrossfadeComponent', () => {
  let component: WebglPostprocessingCrossfadeComponent;
  let fixture: ComponentFixture<WebglPostprocessingCrossfadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingCrossfadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingCrossfadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
