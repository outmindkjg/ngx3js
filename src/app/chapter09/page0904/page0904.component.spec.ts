import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0904Component } from './page0904.component';

describe('Page0904Component', () => {
  let component: Page0904Component;
  let fixture: ComponentFixture<Page0904Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0904Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0904Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
