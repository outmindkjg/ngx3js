import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0511Component } from './page0511.component';

describe('Page0511Component', () => {
  let component: Page0511Component;
  let fixture: ComponentFixture<Page0511Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0511Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0511Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
