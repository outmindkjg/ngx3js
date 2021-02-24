import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1306Component } from './page1306.component';

describe('Page1306Component', () => {
  let component: Page1306Component;
  let fixture: ComponentFixture<Page1306Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1306Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1306Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
