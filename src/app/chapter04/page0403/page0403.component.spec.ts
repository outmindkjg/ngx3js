import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0403Component } from './page0403.component';

describe('Page0403Component', () => {
  let component: Page0403Component;
  let fixture: ComponentFixture<Page0403Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0403Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
