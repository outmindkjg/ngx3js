import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0816Component } from './page0816.component';

describe('Page0816Component', () => {
  let component: Page0816Component;
  let fixture: ComponentFixture<Page0816Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0816Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0816Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
