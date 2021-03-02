import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglFramebufferTextureComponent } from './webgl-framebuffer-texture.component';

describe('WebglFramebufferTextureComponent', () => {
  let component: WebglFramebufferTextureComponent;
  let fixture: ComponentFixture<WebglFramebufferTextureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglFramebufferTextureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglFramebufferTextureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
