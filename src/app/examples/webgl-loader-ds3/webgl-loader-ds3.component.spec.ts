import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderDs3Component } from './webgl-loader-ds3.component';

describe('WebglLoaderDs3Component', () => {
  let component: WebglLoaderDs3Component;
  let fixture: ComponentFixture<WebglLoaderDs3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderDs3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderDs3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
