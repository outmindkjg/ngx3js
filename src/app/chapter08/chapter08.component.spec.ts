import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter08Component } from './chapter08.component';

describe('Chapter08Component', () => {
  let component: Chapter08Component;
  let fixture: ComponentFixture<Chapter08Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter08Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
