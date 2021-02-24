import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter02Component } from './chapter02.component';

describe('Chapter02Component', () => {
  let component: Chapter02Component;
  let fixture: ComponentFixture<Chapter02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
