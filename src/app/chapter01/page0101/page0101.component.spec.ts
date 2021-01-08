import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0101Component } from './page0101.component';

describe('Page0101Component', () => {
  let component: Page0101Component;
  let fixture: ComponentFixture<Page0101Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0101Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
