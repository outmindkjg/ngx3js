import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsAmmoTerrainComponent } from './physics-ammo-terrain.component';

describe('PhysicsAmmoTerrainComponent', () => {
  let component: PhysicsAmmoTerrainComponent;
  let fixture: ComponentFixture<PhysicsAmmoTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicsAmmoTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsAmmoTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
