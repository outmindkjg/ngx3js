import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0508Component } from './page0508.component';

describe('Page0508Component', () => {
  let component: Page0508Component;
  let fixture: ComponentFixture<Page0508Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0508Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0508Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
