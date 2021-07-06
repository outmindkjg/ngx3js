import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsOimoInstancingComponent } from './physics-oimo-instancing.component';

describe('PhysicsOimoInstancingComponent', () => {
  let component: PhysicsOimoInstancingComponent;
  let fixture: ComponentFixture<PhysicsOimoInstancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicsOimoInstancingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsOimoInstancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
