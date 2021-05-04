import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dMoleculesComponent } from './css3d-molecules.component';

describe('Css3dMoleculesComponent', () => {
  let component: Css3dMoleculesComponent;
  let fixture: ComponentFixture<Css3dMoleculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css3dMoleculesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dMoleculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
