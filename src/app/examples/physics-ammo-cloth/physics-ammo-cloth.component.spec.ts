import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsAmmoClothComponent } from './physics-ammo-cloth.component';

describe('PhysicsAmmoClothComponent', () => {
  let component: PhysicsAmmoClothComponent;
  let fixture: ComponentFixture<PhysicsAmmoClothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicsAmmoClothComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsAmmoClothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
