import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTiltComponent } from './webgl-loader-tilt.component';

describe('WebglLoaderTiltComponent', () => {
  let component: WebglLoaderTiltComponent;
  let fixture: ComponentFixture<WebglLoaderTiltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTiltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTiltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
