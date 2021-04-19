import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsPhysicalSheenComponent } from './webgl-materials-physical-sheen.component';

describe('WebglMaterialsPhysicalSheenComponent', () => {
  let component: WebglMaterialsPhysicalSheenComponent;
  let fixture: ComponentFixture<WebglMaterialsPhysicalSheenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsPhysicalSheenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsPhysicalSheenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
