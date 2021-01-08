import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0507Component } from './page0507.component';

describe('Page0507Component', () => {
  let component: Page0507Component;
  let fixture: ComponentFixture<Page0507Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0507Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0507Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
