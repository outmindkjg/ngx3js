import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0102Component } from './page0102.component';

describe('Page0102Component', () => {
  let component: Page0102Component;
  let fixture: ComponentFixture<Page0102Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0102Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0102Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
