import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0506Component } from './page0506.component';

describe('Page0506Component', () => {
  let component: Page0506Component;
  let fixture: ComponentFixture<Page0506Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0506Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0506Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
