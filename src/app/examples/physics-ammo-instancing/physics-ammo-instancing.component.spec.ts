import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsAmmoInstancingComponent } from './physics-ammo-instancing.component';

describe('PhysicsAmmoInstancingComponent', () => {
  let component: PhysicsAmmoInstancingComponent;
  let fixture: ComponentFixture<PhysicsAmmoInstancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicsAmmoInstancingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsAmmoInstancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
