import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter03Component } from './chapter03.component';

describe('Chapter03Component', () => {
  let component: Chapter03Component;
  let fixture: ComponentFixture<Chapter03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter03Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
