import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0807Component } from './page0807.component';

describe('Page0807Component', () => {
  let component: Page0807Component;
  let fixture: ComponentFixture<Page0807Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0807Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0807Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
