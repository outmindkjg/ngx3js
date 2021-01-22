import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0817Component } from './page0817.component';

describe('Page0817Component', () => {
  let component: Page0817Component;
  let fixture: ComponentFixture<Page0817Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0817Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0817Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
