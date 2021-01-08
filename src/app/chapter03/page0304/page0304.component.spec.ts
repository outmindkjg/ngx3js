import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0304Component } from './page0304.component';

describe('Page0304Component', () => {
  let component: Page0304Component;
  let fixture: ComponentFixture<Page0304Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0304Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0304Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
