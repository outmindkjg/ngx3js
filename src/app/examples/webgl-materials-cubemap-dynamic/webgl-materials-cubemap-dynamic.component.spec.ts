import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCubemapDynamicComponent } from './webgl-materials-cubemap-dynamic.component';

describe('WebglMaterialsCubemapDynamicComponent', () => {
  let component: WebglMaterialsCubemapDynamicComponent;
  let fixture: ComponentFixture<WebglMaterialsCubemapDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCubemapDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCubemapDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
