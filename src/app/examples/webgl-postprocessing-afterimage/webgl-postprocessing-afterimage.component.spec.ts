import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingAfterimageComponent } from './webgl-postprocessing-afterimage.component';

describe('WebglPostprocessingAfterimageComponent', () => {
  let component: WebglPostprocessingAfterimageComponent;
  let fixture: ComponentFixture<WebglPostprocessingAfterimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingAfterimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingAfterimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
