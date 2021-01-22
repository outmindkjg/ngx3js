import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1101Component } from './page1101.component';

describe('Page1101Component', () => {
  let component: Page1101Component;
  let fixture: ComponentFixture<Page1101Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1101Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
