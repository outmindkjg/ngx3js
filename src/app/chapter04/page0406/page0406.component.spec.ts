import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0406Component } from './page0406.component';

describe('Page0406Component', () => {
  let component: Page0406Component;
  let fixture: ComponentFixture<Page0406Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0406Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0406Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
