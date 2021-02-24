import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1301Component } from './page1301.component';

describe('Page1301Component', () => {
  let component: Page1301Component;
  let fixture: ComponentFixture<Page1301Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1301Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1301Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
