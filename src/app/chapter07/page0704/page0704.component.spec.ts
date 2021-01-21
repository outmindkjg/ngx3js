import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0704Component } from './page0704.component';

describe('Page0704Component', () => {
  let component: Page0704Component;
  let fixture: ComponentFixture<Page0704Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0704Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0704Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
