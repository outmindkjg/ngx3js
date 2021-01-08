import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0607Component } from './page0607.component';

describe('Page0607Component', () => {
  let component: Page0607Component;
  let fixture: ComponentFixture<Page0607Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0607Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0607Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
