import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0504Component } from './page0504.component';

describe('Page0504Component', () => {
  let component: Page0504Component;
  let fixture: ComponentFixture<Page0504Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0504Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0504Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
