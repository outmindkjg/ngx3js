import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCurvatureComponent } from './webgl-materials-curvature.component';

describe('WebglMaterialsCurvatureComponent', () => {
  let component: WebglMaterialsCurvatureComponent;
  let fixture: ComponentFixture<WebglMaterialsCurvatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCurvatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCurvatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
