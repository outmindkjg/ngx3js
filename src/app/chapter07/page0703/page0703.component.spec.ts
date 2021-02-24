import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0703Component } from './page0703.component';

describe('Page0703Component', () => {
  let component: Page0703Component;
  let fixture: ComponentFixture<Page0703Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0703Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0703Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
