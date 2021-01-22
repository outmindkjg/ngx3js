import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0813Component } from './page0813.component';

describe('Page0813Component', () => {
  let component: Page0813Component;
  let fixture: ComponentFixture<Page0813Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0813Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0813Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
