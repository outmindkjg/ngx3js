import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsWireframeComponent } from './webgl-materials-wireframe.component';

describe('WebglMaterialsWireframeComponent', () => {
  let component: WebglMaterialsWireframeComponent;
  let fixture: ComponentFixture<WebglMaterialsWireframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsWireframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsWireframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
