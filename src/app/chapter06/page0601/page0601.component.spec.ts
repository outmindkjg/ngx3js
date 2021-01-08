import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0601Component } from './page0601.component';

describe('Page0601Component', () => {
  let component: Page0601Component;
  let fixture: ComponentFixture<Page0601Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0601Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0601Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
