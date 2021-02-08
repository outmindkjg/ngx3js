import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1302Component } from './page1302.component';

describe('Page1302Component', () => {
  let component: Page1302Component;
  let fixture: ComponentFixture<Page1302Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1302Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1302Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
