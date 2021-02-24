import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1307Component } from './page1307.component';

describe('Page1307Component', () => {
  let component: Page1307Component;
  let fixture: ComponentFixture<Page1307Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1307Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1307Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
