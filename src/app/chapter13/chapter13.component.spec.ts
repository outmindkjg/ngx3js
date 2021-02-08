import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter13Component } from './chapter13.component';

describe('Chapter13Component', () => {
  let component: Chapter13Component;
  let fixture: ComponentFixture<Chapter13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chapter13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
