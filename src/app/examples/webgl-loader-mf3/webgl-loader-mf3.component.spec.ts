import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderMf3Component } from './webgl-loader-mf3.component';

describe('WebglLoaderMf3Component', () => {
  let component: WebglLoaderMf3Component;
  let fixture: ComponentFixture<WebglLoaderMf3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderMf3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderMf3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
