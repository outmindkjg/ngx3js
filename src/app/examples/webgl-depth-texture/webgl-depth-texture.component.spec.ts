import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglDepthTextureComponent } from './webgl-depth-texture.component';

describe('WebglDepthTextureComponent', () => {
  let component: WebglDepthTextureComponent;
  let fixture: ComponentFixture<WebglDepthTextureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglDepthTextureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglDepthTextureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
