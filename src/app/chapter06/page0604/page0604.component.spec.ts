import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0604Component } from './page0604.component';

describe('Page0604Component', () => {
  let component: Page0604Component;
  let fixture: ComponentFixture<Page0604Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0604Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0604Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
