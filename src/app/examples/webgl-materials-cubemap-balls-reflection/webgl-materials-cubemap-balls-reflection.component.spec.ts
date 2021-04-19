import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCubemapBallsReflectionComponent } from './webgl-materials-cubemap-balls-reflection.component';

describe('WebglMaterialsCubemapBallsReflectionComponent', () => {
  let component: WebglMaterialsCubemapBallsReflectionComponent;
  let fixture: ComponentFixture<WebglMaterialsCubemapBallsReflectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCubemapBallsReflectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCubemapBallsReflectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
