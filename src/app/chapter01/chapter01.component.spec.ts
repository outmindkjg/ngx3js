import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter01Component } from './chapter01.component';

describe('Chapter01Component', () => {
  let component: Chapter01Component;
  let fixture: ComponentFixture<Chapter01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
