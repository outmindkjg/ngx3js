import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0402Component } from './page0402.component';

describe('Page0402Component', () => {
  let component: Page0402Component;
  let fixture: ComponentFixture<Page0402Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0402Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0402Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
