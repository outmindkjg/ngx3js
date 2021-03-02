import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureLottieComponent } from './webgl-loader-texture-lottie.component';

describe('WebglLoaderTextureLottieComponent', () => {
  let component: WebglLoaderTextureLottieComponent;
  let fixture: ComponentFixture<WebglLoaderTextureLottieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureLottieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureLottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
