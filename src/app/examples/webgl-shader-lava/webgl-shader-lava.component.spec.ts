import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShaderLavaComponent } from './webgl-shader-lava.component';

describe('WebglShaderLavaComponent', () => {
  let component: WebglShaderLavaComponent;
  let fixture: ComponentFixture<WebglShaderLavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShaderLavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShaderLavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
