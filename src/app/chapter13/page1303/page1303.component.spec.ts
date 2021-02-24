import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1303Component } from './page1303.component';

describe('Page1303Component', () => {
  let component: Page1303Component;
  let fixture: ComponentFixture<Page1303Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1303Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1303Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
