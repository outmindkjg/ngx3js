import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2MaterialsTexture3dComponent } from './webgl2-materials-texture3d.component';

describe('Webgl2MaterialsTexture3dComponent', () => {
  let component: Webgl2MaterialsTexture3dComponent;
  let fixture: ComponentFixture<Webgl2MaterialsTexture3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2MaterialsTexture3dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2MaterialsTexture3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
