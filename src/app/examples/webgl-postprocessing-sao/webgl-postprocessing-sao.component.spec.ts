import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingSaoComponent } from './webgl-postprocessing-sao.component';

describe('WebglPostprocessingSaoComponent', () => {
  let component: WebglPostprocessingSaoComponent;
  let fixture: ComponentFixture<WebglPostprocessingSaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingSaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingSaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
