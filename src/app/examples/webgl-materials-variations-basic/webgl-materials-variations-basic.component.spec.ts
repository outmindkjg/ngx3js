import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsVariationsBasicComponent } from './webgl-materials-variations-basic.component';

describe('WebglMaterialsVariationsBasicComponent', () => {
  let component: WebglMaterialsVariationsBasicComponent;
  let fixture: ComponentFixture<WebglMaterialsVariationsBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsVariationsBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsVariationsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
