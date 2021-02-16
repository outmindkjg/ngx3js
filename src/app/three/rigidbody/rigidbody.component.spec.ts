import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigidbodyComponent } from './rigidbody.component';

describe('RigidbodyComponent', () => {
  let component: RigidbodyComponent;
  let fixture: ComponentFixture<RigidbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RigidbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RigidbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
