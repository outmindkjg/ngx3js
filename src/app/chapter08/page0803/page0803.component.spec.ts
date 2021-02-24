import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0803Component } from './page0803.component';

describe('Page0803Component', () => {
  let component: Page0803Component;
  let fixture: ComponentFixture<Page0803Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0803Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0803Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
