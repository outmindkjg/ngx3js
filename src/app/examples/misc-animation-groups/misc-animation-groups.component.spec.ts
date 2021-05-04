import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscAnimationGroupsComponent } from './misc-animation-groups.component';

describe('MiscAnimationGroupsComponent', () => {
  let component: MiscAnimationGroupsComponent;
  let fixture: ComponentFixture<MiscAnimationGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscAnimationGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscAnimationGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
