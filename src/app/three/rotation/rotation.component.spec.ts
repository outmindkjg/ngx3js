import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationComponent } from './rotation.component';

describe('RotationComponent', () => {
  let component: RotationComponent;
  let fixture: ComponentFixture<RotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
