import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0709Component } from './page0709.component';

describe('Page0709Component', () => {
  let component: Page0709Component;
  let fixture: ComponentFixture<Page0709Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0709Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0709Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
