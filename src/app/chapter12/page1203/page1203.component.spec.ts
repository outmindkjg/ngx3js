import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1203Component } from './page1203.component';

describe('Page1203Component', () => {
  let component: Page1203Component;
  let fixture: ComponentFixture<Page1203Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1203Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1203Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
