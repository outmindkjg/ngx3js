import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0105Component } from './page0105.component';

describe('Page0105Component', () => {
  let component: Page0105Component;
  let fixture: ComponentFixture<Page0105Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0105Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0105Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
