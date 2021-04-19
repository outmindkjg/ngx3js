import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsTextureFiltersComponent } from './webgl-materials-texture-filters.component';

describe('WebglMaterialsTextureFiltersComponent', () => {
  let component: WebglMaterialsTextureFiltersComponent;
  let fixture: ComponentFixture<WebglMaterialsTextureFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsTextureFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsTextureFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
