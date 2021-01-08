import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0306Component } from './page0306.component';

describe('Page0306Component', () => {
  let component: Page0306Component;
  let fixture: ComponentFixture<Page0306Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0306Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0306Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
