import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dPeriodictableComponent } from './css3d-periodictable.component';

describe('Css3dPeriodictableComponent', () => {
  let component: Css3dPeriodictableComponent;
  let fixture: ComponentFixture<Css3dPeriodictableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css3dPeriodictableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dPeriodictableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
