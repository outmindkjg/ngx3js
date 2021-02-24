import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0912Component } from './page0912.component';

describe('Page0912Component', () => {
  let component: Page0912Component;
  let fixture: ComponentFixture<Page0912Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0912Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0912Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
