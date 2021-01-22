import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1104Component } from './page1104.component';

describe('Page1104Component', () => {
  let component: Page1104Component;
  let fixture: ComponentFixture<Page1104Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1104Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1104Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
