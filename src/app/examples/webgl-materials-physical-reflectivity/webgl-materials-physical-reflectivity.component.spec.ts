import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsPhysicalReflectivityComponent } from './webgl-materials-physical-reflectivity.component';

describe('WebglMaterialsPhysicalReflectivityComponent', () => {
  let component: WebglMaterialsPhysicalReflectivityComponent;
  let fixture: ComponentFixture<WebglMaterialsPhysicalReflectivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsPhysicalReflectivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsPhysicalReflectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
