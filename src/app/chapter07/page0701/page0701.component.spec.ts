import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0701Component } from './page0701.component';

describe('Page0701Component', () => {
  let component: Page0701Component;
  let fixture: ComponentFixture<Page0701Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0701Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0701Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
