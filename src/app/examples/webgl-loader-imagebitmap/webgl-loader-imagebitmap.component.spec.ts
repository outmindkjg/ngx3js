import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderImagebitmapComponent } from './webgl-loader-imagebitmap.component';

describe('WebglLoaderImagebitmapComponent', () => {
  let component: WebglLoaderImagebitmapComponent;
  let fixture: ComponentFixture<WebglLoaderImagebitmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderImagebitmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderImagebitmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
