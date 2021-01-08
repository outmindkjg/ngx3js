import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0302Component } from './page0302.component';

describe('Page0302Component', () => {
  let component: Page0302Component;
  let fixture: ComponentFixture<Page0302Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0302Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0302Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
