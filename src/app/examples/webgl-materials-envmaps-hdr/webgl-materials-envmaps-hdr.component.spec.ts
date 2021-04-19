import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsEnvmapsHdrComponent } from './webgl-materials-envmaps-hdr.component';

describe('WebglMaterialsEnvmapsHdrComponent', () => {
  let component: WebglMaterialsEnvmapsHdrComponent;
  let fixture: ComponentFixture<WebglMaterialsEnvmapsHdrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsEnvmapsHdrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsEnvmapsHdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
