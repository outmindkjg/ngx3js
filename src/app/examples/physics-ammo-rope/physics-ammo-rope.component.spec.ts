import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsAmmoRopeComponent } from './physics-ammo-rope.component';

describe('PhysicsAmmoRopeComponent', () => {
  let component: PhysicsAmmoRopeComponent;
  let fixture: ComponentFixture<PhysicsAmmoRopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicsAmmoRopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsAmmoRopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
