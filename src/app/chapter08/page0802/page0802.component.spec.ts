import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0802Component } from './page0802.component';

describe('Page0802Component', () => {
  let component: Page0802Component;
  let fixture: ComponentFixture<Page0802Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0802Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0802Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
