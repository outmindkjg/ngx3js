import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dSpritesComponent } from './css3d-sprites.component';

describe('Css3dSpritesComponent', () => {
  let component: Css3dSpritesComponent;
  let fixture: ComponentFixture<Css3dSpritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css3dSpritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dSpritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
