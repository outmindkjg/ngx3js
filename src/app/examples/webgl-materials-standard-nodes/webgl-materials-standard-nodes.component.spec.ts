import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsStandardNodesComponent } from './webgl-materials-standard-nodes.component';

describe('WebglMaterialsStandardNodesComponent', () => {
  let component: WebglMaterialsStandardNodesComponent;
  let fixture: ComponentFixture<WebglMaterialsStandardNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsStandardNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsStandardNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
