import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0201Component } from './page0201.component';

describe('Page0201Component', () => {
  let component: Page0201Component;
  let fixture: ComponentFixture<Page0201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0201Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
