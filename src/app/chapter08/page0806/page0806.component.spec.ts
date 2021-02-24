import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0806Component } from './page0806.component';

describe('Page0806Component', () => {
  let component: Page0806Component;
  let fixture: ComponentFixture<Page0806Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0806Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0806Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
