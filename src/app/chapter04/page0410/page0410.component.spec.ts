import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0410Component } from './page0410.component';

describe('Page0410Component', () => {
  let component: Page0410Component;
  let fixture: ComponentFixture<Page0410Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0410Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0410Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
