import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsVariationsLambertComponent } from './webgl-materials-variations-lambert.component';

describe('WebglMaterialsVariationsLambertComponent', () => {
  let component: WebglMaterialsVariationsLambertComponent;
  let fixture: ComponentFixture<WebglMaterialsVariationsLambertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsVariationsLambertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsVariationsLambertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
