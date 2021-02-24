import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0707Component } from './page0707.component';

describe('Page0707Component', () => {
  let component: Page0707Component;
  let fixture: ComponentFixture<Page0707Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0707Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0707Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
