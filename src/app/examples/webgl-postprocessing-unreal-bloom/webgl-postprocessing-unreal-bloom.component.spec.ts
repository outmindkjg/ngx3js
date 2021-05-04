import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingUnrealBloomComponent } from './webgl-postprocessing-unreal-bloom.component';

describe('WebglPostprocessingUnrealBloomComponent', () => {
  let component: WebglPostprocessingUnrealBloomComponent;
  let fixture: ComponentFixture<WebglPostprocessingUnrealBloomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingUnrealBloomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingUnrealBloomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
