import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter09Component } from './chapter09.component';

describe('Chapter09Component', () => {
  let component: Chapter09Component;
  let fixture: ComponentFixture<Chapter09Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter09Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
