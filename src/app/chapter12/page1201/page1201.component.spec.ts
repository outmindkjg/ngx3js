import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1201Component } from './page1201.component';

describe('Page1201Component', () => {
  let component: Page1201Component;
  let fixture: ComponentFixture<Page1201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1201Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
