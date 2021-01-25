import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0905Component } from './page0905.component';

describe('Page0905Component', () => {
  let component: Page0905Component;
  let fixture: ComponentFixture<Page0905Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0905Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0905Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
