import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigidbodyNodeComponent } from './rigidbody-node.component';

describe('RigidbodyNodeComponent', () => {
  let component: RigidbodyNodeComponent;
  let fixture: ComponentFixture<RigidbodyNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RigidbodyNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RigidbodyNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
