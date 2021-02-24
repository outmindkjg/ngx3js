import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0910Component } from './page0910.component';

describe('Page0910Component', () => {
  let component: Page0910Component;
  let fixture: ComponentFixture<Page0910Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0910Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0910Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
