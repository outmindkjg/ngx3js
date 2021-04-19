import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsVariationsToonComponent } from './webgl-materials-variations-toon.component';

describe('WebglMaterialsVariationsToonComponent', () => {
  let component: WebglMaterialsVariationsToonComponent;
  let fixture: ComponentFixture<WebglMaterialsVariationsToonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsVariationsToonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsVariationsToonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
