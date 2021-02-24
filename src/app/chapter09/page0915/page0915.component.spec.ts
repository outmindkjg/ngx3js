import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0915Component } from './page0915.component';

describe('Page0915Component', () => {
  let component: Page0915Component;
  let fixture: ComponentFixture<Page0915Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0915Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0915Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
