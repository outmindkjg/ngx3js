import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1205Component } from './page1205.component';

describe('Page1205Component', () => {
  let component: Page1205Component;
  let fixture: ComponentFixture<Page1205Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1205Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1205Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
