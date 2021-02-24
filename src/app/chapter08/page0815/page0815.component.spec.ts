import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0815Component } from './page0815.component';

describe('Page0815Component', () => {
  let component: Page0815Component;
  let fixture: ComponentFixture<Page0815Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0815Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0815Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
