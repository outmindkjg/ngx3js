import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dPanoramaComponent } from './css3d-panorama.component';

describe('Css3dPanoramaComponent', () => {
  let component: Css3dPanoramaComponent;
  let fixture: ComponentFixture<Css3dPanoramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css3dPanoramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
