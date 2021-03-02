import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderSvgComponent } from './webgl-loader-svg.component';

describe('WebglLoaderSvgComponent', () => {
  let component: WebglLoaderSvgComponent;
  let fixture: ComponentFixture<WebglLoaderSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
