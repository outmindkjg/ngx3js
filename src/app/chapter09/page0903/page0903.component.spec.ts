import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0903Component } from './page0903.component';

describe('Page0903Component', () => {
  let component: Page0903Component;
  let fixture: ComponentFixture<Page0903Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0903Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0903Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
