import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0307Component } from './page0307.component';

describe('Page0307Component', () => {
  let component: Page0307Component;
  let fixture: ComponentFixture<Page0307Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0307Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0307Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
