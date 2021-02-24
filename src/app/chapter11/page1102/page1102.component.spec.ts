import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1102Component } from './page1102.component';

describe('Page1102Component', () => {
  let component: Page1102Component;
  let fixture: ComponentFixture<Page1102Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1102Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1102Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
