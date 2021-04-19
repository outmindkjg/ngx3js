import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsLightmapComponent } from './webgl-materials-lightmap.component';

describe('WebglMaterialsLightmapComponent', () => {
  let component: WebglMaterialsLightmapComponent;
  let fixture: ComponentFixture<WebglMaterialsLightmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsLightmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsLightmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
