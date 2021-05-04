import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsAmmoBreakComponent } from './physics-ammo-break.component';

describe('PhysicsAmmoBreakComponent', () => {
  let component: PhysicsAmmoBreakComponent;
  let fixture: ComponentFixture<PhysicsAmmoBreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicsAmmoBreakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsAmmoBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
