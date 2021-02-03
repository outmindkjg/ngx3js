import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1204Component } from './page1204.component';

describe('Page1204Component', () => {
  let component: Page1204Component;
  let fixture: ComponentFixture<Page1204Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1204Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1204Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
