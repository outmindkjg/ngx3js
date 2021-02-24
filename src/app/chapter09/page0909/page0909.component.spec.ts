import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0909Component } from './page0909.component';

describe('Page0909Component', () => {
  let component: Page0909Component;
  let fixture: ComponentFixture<Page0909Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0909Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0909Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
