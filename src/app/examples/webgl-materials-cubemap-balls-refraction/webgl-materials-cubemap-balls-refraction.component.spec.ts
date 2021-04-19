import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCubemapBallsRefractionComponent } from './webgl-materials-cubemap-balls-refraction.component';

describe('WebglMaterialsCubemapBallsRefractionComponent', () => {
  let component: WebglMaterialsCubemapBallsRefractionComponent;
  let fixture: ComponentFixture<WebglMaterialsCubemapBallsRefractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCubemapBallsRefractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCubemapBallsRefractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
