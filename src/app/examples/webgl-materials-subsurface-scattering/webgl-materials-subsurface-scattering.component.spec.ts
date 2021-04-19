import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsSubsurfaceScatteringComponent } from './webgl-materials-subsurface-scattering.component';

describe('WebglMaterialsSubsurfaceScatteringComponent', () => {
  let component: WebglMaterialsSubsurfaceScatteringComponent;
  let fixture: ComponentFixture<WebglMaterialsSubsurfaceScatteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsSubsurfaceScatteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsSubsurfaceScatteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
