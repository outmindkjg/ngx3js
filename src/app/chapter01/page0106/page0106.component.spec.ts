import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0106Component } from './page0106.component';

describe('Page0106Component', () => {
  let component: Page0106Component;
  let fixture: ComponentFixture<Page0106Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0106Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0106Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
