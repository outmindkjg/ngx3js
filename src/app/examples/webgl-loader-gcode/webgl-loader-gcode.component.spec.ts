import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderGcodeComponent } from './webgl-loader-gcode.component';

describe('WebglLoaderGcodeComponent', () => {
  let component: WebglLoaderGcodeComponent;
  let fixture: ComponentFixture<WebglLoaderGcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderGcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderGcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
