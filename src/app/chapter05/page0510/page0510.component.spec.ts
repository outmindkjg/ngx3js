import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0510Component } from './page0510.component';

describe('Page0510Component', () => {
  let component: Page0510Component;
  let fixture: ComponentFixture<Page0510Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0510Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0510Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
