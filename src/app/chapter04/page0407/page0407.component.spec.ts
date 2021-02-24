import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0407Component } from './page0407.component';

describe('Page0407Component', () => {
  let component: Page0407Component;
  let fixture: ComponentFixture<Page0407Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0407Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0407Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
