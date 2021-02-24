import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0204Component } from './page0204.component';

describe('Page0204Component', () => {
  let component: Page0204Component;
  let fixture: ComponentFixture<Page0204Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0204Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0204Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
