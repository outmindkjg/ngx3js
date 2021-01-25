import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0911Component } from './page0911.component';

describe('Page0911Component', () => {
  let component: Page0911Component;
  let fixture: ComponentFixture<Page0911Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0911Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0911Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
