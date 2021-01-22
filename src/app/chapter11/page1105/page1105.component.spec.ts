import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1105Component } from './page1105.component';

describe('Page1105Component', () => {
  let component: Page1105Component;
  let fixture: ComponentFixture<Page1105Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1105Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1105Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
