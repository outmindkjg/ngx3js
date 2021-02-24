import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0503Component } from './page0503.component';

describe('Page0503Component', () => {
  let component: Page0503Component;
  let fixture: ComponentFixture<Page0503Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0503Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0503Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
