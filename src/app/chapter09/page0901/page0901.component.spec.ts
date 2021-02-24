import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0901Component } from './page0901.component';

describe('Page0901Component', () => {
  let component: Page0901Component;
  let fixture: ComponentFixture<Page0901Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0901Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0901Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
