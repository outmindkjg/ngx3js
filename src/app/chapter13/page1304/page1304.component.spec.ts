import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1304Component } from './page1304.component';

describe('Page1304Component', () => {
  let component: Page1304Component;
  let fixture: ComponentFixture<Page1304Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1304Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1304Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
