import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0408Component } from './page0408.component';

describe('Page0408Component', () => {
  let component: Page0408Component;
  let fixture: ComponentFixture<Page0408Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0408Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0408Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
