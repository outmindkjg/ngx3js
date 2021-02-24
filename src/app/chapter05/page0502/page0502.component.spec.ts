import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0502Component } from './page0502.component';

describe('Page0502Component', () => {
  let component: Page0502Component;
  let fixture: ComponentFixture<Page0502Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0502Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0502Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
