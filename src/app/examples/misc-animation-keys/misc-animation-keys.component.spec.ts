import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscAnimationKeysComponent } from './misc-animation-keys.component';

describe('MiscAnimationKeysComponent', () => {
  let component: MiscAnimationKeysComponent;
  let fixture: ComponentFixture<MiscAnimationKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscAnimationKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscAnimationKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
