import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderMd2ControlComponent } from './webgl-loader-md2-control.component';

describe('WebglLoaderMd2ControlComponent', () => {
  let component: WebglLoaderMd2ControlComponent;
  let fixture: ComponentFixture<WebglLoaderMd2ControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderMd2ControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderMd2ControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
