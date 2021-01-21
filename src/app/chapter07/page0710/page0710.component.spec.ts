import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0710Component } from './page0710.component';

describe('Page0710Component', () => {
  let component: Page0710Component;
  let fixture: ComponentFixture<Page0710Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0710Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0710Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
