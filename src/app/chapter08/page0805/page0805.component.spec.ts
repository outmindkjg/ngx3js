import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0805Component } from './page0805.component';

describe('Page0805Component', () => {
  let component: Page0805Component;
  let fixture: ComponentFixture<Page0805Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0805Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0805Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
