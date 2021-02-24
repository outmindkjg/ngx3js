import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0812Component } from './page0812.component';

describe('Page0812Component', () => {
  let component: Page0812Component;
  let fixture: ComponentFixture<Page0812Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0812Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0812Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
