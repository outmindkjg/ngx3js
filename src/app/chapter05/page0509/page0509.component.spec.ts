import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0509Component } from './page0509.component';

describe('Page0509Component', () => {
  let component: Page0509Component;
  let fixture: ComponentFixture<Page0509Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0509Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0509Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
