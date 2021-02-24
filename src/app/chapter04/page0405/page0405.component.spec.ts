import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0405Component } from './page0405.component';

describe('Page0405Component', () => {
  let component: Page0405Component;
  let fixture: ComponentFixture<Page0405Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0405Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0405Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
