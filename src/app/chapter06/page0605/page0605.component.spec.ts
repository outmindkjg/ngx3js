import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0605Component } from './page0605.component';

describe('Page0605Component', () => {
  let component: Page0605Component;
  let fixture: ComponentFixture<Page0605Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0605Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0605Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
