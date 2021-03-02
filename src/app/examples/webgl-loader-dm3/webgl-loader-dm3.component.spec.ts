import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderDm3Component } from './webgl-loader-dm3.component';

describe('WebglLoaderDm3Component', () => {
  let component: WebglLoaderDm3Component;
  let fixture: ComponentFixture<WebglLoaderDm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderDm3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderDm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
