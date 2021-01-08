import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0202Component } from './page0202.component';

describe('Page0202Component', () => {
  let component: Page0202Component;
  let fixture: ComponentFixture<Page0202Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0202Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0202Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
