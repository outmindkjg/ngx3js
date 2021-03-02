import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureDdsComponent } from './webgl-loader-texture-dds.component';

describe('WebglLoaderTextureDdsComponent', () => {
  let component: WebglLoaderTextureDdsComponent;
  let fixture: ComponentFixture<WebglLoaderTextureDdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureDdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureDdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
