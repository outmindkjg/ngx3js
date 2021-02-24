import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1107Component } from './page1107.component';

describe('Page1107Component', () => {
  let component: Page1107Component;
  let fixture: ComponentFixture<Page1107Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1107Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1107Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
