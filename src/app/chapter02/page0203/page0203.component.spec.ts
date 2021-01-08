import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0203Component } from './page0203.component';

describe('Page0203Component', () => {
  let component: Page0203Component;
  let fixture: ComponentFixture<Page0203Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0203Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0203Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
