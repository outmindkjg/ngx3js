import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationGroupComponent } from './animation-group.component';

describe('AnimationGroupComponent', () => {
  let component: AnimationGroupComponent;
  let fixture: ComponentFixture<AnimationGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
