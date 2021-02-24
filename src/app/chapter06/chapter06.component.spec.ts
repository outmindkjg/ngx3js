import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter06Component } from './chapter06.component';

describe('Chapter06Component', () => {
  let component: Chapter06Component;
  let fixture: ComponentFixture<Chapter06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter06Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
