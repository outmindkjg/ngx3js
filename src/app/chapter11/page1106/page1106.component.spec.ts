import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1106Component } from './page1106.component';

describe('Page1106Component', () => {
  let component: Page1106Component;
  let fixture: ComponentFixture<Page1106Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1106Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1106Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
