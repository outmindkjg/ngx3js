import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureTgaComponent } from './webgl-loader-texture-tga.component';

describe('WebglLoaderTextureTgaComponent', () => {
  let component: WebglLoaderTextureTgaComponent;
  let fixture: ComponentFixture<WebglLoaderTextureTgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureTgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureTgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
