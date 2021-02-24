import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0205Component } from './page0205.component';

describe('Page0205Component', () => {
  let component: Page0205Component;
  let fixture: ComponentFixture<Page0205Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0205Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0205Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
