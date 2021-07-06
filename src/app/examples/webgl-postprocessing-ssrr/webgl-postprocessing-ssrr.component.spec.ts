import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingSsrrComponent } from './webgl-postprocessing-ssrr.component';

describe('WebglPostprocessingSsrrComponent', () => {
  let component: WebglPostprocessingSsrrComponent;
  let fixture: ComponentFixture<WebglPostprocessingSsrrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingSsrrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingSsrrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
