import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0804Component } from './page0804.component';

describe('Page0804Component', () => {
  let component: Page0804Component;
  let fixture: ComponentFixture<Page0804Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0804Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0804Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
