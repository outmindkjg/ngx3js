import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0814Component } from './page0814.component';

describe('Page0814Component', () => {
  let component: Page0814Component;
  let fixture: ComponentFixture<Page0814Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0814Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0814Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
