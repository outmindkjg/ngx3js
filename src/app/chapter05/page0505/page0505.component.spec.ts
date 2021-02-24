import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0505Component } from './page0505.component';

describe('Page0505Component', () => {
  let component: Page0505Component;
  let fixture: ComponentFixture<Page0505Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0505Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0505Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
