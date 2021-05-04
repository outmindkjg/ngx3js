import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsEnvmapsPmremNodesComponent } from './webgl-materials-envmaps-pmrem-nodes.component';

describe('WebglMaterialsEnvmapsPmremNodesComponent', () => {
  let component: WebglMaterialsEnvmapsPmremNodesComponent;
  let fixture: ComponentFixture<WebglMaterialsEnvmapsPmremNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsEnvmapsPmremNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsEnvmapsPmremNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
