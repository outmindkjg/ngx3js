import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsEnvmapsHdrNodesComponent } from './webgl-materials-envmaps-hdr-nodes.component';

describe('WebglMaterialsEnvmapsHdrNodesComponent', () => {
  let component: WebglMaterialsEnvmapsHdrNodesComponent;
  let fixture: ComponentFixture<WebglMaterialsEnvmapsHdrNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsEnvmapsHdrNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsEnvmapsHdrNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
