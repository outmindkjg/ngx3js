import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0907Component } from './page0907.component';

describe('Page0907Component', () => {
  let component: Page0907Component;
  let fixture: ComponentFixture<Page0907Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0907Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0907Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
