import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter07Component } from './chapter07.component';

describe('Chapter07Component', () => {
  let component: Chapter07Component;
  let fixture: ComponentFixture<Chapter07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter07Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
