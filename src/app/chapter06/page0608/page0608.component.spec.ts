import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0608Component } from './page0608.component';

describe('Page0608Component', () => {
  let component: Page0608Component;
  let fixture: ComponentFixture<Page0608Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0608Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0608Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
