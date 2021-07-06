import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingSsrComponent } from './webgl-postprocessing-ssr.component';

describe('WebglPostprocessingSsrComponent', () => {
  let component: WebglPostprocessingSsrComponent;
  let fixture: ComponentFixture<WebglPostprocessingSsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingSsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingSsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
