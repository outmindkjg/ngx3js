import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsTextureCanvasComponent } from './webgl-materials-texture-canvas.component';

describe('WebglMaterialsTextureCanvasComponent', () => {
  let component: WebglMaterialsTextureCanvasComponent;
  let fixture: ComponentFixture<WebglMaterialsTextureCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsTextureCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsTextureCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
