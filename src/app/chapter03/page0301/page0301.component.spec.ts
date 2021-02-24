import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0301Component } from './page0301.component';

describe('Page0301Component', () => {
  let component: Page0301Component;
  let fixture: ComponentFixture<Page0301Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0301Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0301Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
