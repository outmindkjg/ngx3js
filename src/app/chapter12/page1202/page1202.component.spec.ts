import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1202Component } from './page1202.component';

describe('Page1202Component', () => {
  let component: Page1202Component;
  let fixture: ComponentFixture<Page1202Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1202Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1202Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
