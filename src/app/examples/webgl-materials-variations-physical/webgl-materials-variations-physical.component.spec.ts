import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsVariationsPhysicalComponent } from './webgl-materials-variations-physical.component';

describe('WebglMaterialsVariationsPhysicalComponent', () => {
  let component: WebglMaterialsVariationsPhysicalComponent;
  let fixture: ComponentFixture<WebglMaterialsVariationsPhysicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsVariationsPhysicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsVariationsPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
