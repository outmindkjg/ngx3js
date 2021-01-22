import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0811Component } from './page0811.component';

describe('Page0811Component', () => {
  let component: Page0811Component;
  let fixture: ComponentFixture<Page0811Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0811Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0811Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
