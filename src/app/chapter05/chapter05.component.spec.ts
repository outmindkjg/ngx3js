import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter05Component } from './chapter05.component';

describe('Chapter05Component', () => {
  let component: Chapter05Component;
  let fixture: ComponentFixture<Chapter05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter05Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
