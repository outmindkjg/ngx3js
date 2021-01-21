import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0702Component } from './page0702.component';

describe('Page0702Component', () => {
  let component: Page0702Component;
  let fixture: ComponentFixture<Page0702Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0702Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0702Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
