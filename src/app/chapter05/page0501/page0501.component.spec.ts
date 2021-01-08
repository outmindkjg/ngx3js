import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0501Component } from './page0501.component';

describe('Page0501Component', () => {
  let component: Page0501Component;
  let fixture: ComponentFixture<Page0501Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0501Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0501Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
