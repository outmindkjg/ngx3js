import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsEnvmapsComponent } from './webgl-materials-envmaps.component';

describe('WebglMaterialsEnvmapsComponent', () => {
  let component: WebglMaterialsEnvmapsComponent;
  let fixture: ComponentFixture<WebglMaterialsEnvmapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsEnvmapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsEnvmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
