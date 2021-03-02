import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderMd2Component } from './webgl-loader-md2.component';

describe('WebglLoaderMd2Component', () => {
  let component: WebglLoaderMd2Component;
  let fixture: ComponentFixture<WebglLoaderMd2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderMd2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderMd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
