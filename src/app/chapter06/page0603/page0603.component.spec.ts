import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0603Component } from './page0603.component';

describe('Page0603Component', () => {
  let component: Page0603Component;
  let fixture: ComponentFixture<Page0603Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0603Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0603Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
