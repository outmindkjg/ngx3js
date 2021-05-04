import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingSsaoComponent } from './webgl-postprocessing-ssao.component';

describe('WebglPostprocessingSsaoComponent', () => {
  let component: WebglPostprocessingSsaoComponent;
  let fixture: ComponentFixture<WebglPostprocessingSsaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingSsaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingSsaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
