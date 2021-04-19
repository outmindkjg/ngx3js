import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsVariationsPhongComponent } from './webgl-materials-variations-phong.component';

describe('WebglMaterialsVariationsPhongComponent', () => {
  let component: WebglMaterialsVariationsPhongComponent;
  let fixture: ComponentFixture<WebglMaterialsVariationsPhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsVariationsPhongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsVariationsPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
