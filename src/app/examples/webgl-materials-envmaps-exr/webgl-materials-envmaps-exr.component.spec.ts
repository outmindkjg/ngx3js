import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsEnvmapsExrComponent } from './webgl-materials-envmaps-exr.component';

describe('WebglMaterialsEnvmapsExrComponent', () => {
  let component: WebglMaterialsEnvmapsExrComponent;
  let fixture: ComponentFixture<WebglMaterialsEnvmapsExrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsEnvmapsExrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsEnvmapsExrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
