import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsNodesComponent } from './webgl-materials-nodes.component';

describe('WebglMaterialsNodesComponent', () => {
  let component: WebglMaterialsNodesComponent;
  let fixture: ComponentFixture<WebglMaterialsNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
