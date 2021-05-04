import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadersOceanComponent } from './webgl-shaders-ocean.component';

describe('WebglShadersOceanComponent', () => {
  let component: WebglShadersOceanComponent;
  let fixture: ComponentFixture<WebglShadersOceanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadersOceanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadersOceanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
