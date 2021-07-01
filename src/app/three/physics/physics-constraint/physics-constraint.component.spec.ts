import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsConstraintComponent } from './physics-constraint.component';

describe('PhysicsConstraintComponent', () => {
  let component: PhysicsConstraintComponent;
  let fixture: ComponentFixture<PhysicsConstraintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicsConstraintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
