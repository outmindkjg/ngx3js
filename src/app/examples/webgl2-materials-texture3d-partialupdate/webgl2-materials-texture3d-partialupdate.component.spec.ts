import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2MaterialsTexture3dPartialupdateComponent } from './webgl2-materials-texture3d-partialupdate.component';

describe('Webgl2MaterialsTexture3dPartialupdateComponent', () => {
  let component: Webgl2MaterialsTexture3dPartialupdateComponent;
  let fixture: ComponentFixture<Webgl2MaterialsTexture3dPartialupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2MaterialsTexture3dPartialupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2MaterialsTexture3dPartialupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
