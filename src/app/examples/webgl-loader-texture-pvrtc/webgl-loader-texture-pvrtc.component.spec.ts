import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTexturePvrtcComponent } from './webgl-loader-texture-pvrtc.component';

describe('WebglLoaderTexturePvrtcComponent', () => {
  let component: WebglLoaderTexturePvrtcComponent;
  let fixture: ComponentFixture<WebglLoaderTexturePvrtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTexturePvrtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTexturePvrtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
