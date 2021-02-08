import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1305Component } from './page1305.component';

describe('Page1305Component', () => {
  let component: Page1305Component;
  let fixture: ComponentFixture<Page1305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1305Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
