import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsPhysicalClearcoatComponent } from './webgl-materials-physical-clearcoat.component';

describe('WebglMaterialsPhysicalClearcoatComponent', () => {
  let component: WebglMaterialsPhysicalClearcoatComponent;
  let fixture: ComponentFixture<WebglMaterialsPhysicalClearcoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsPhysicalClearcoatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsPhysicalClearcoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
