import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0708Component } from './page0708.component';

describe('Page0708Component', () => {
  let component: Page0708Component;
  let fixture: ComponentFixture<Page0708Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0708Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0708Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
