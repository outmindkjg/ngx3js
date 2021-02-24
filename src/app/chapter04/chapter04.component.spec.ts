import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter04Component } from './chapter04.component';

describe('Chapter04Component', () => {
  let component: Chapter04Component;
  let fixture: ComponentFixture<Chapter04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter04Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
