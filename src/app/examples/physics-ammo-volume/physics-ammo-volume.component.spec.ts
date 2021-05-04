import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsAmmoVolumeComponent } from './physics-ammo-volume.component';

describe('PhysicsAmmoVolumeComponent', () => {
  let component: PhysicsAmmoVolumeComponent;
  let fixture: ComponentFixture<PhysicsAmmoVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicsAmmoVolumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsAmmoVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
