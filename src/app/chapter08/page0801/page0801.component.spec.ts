import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0801Component } from './page0801.component';

describe('Page0801Component', () => {
  let component: Page0801Component;
  let fixture: ComponentFixture<Page0801Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0801Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0801Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
