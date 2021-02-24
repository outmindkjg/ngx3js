import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0914Component } from './page0914.component';

describe('Page0914Component', () => {
  let component: Page0914Component;
  let fixture: ComponentFixture<Page0914Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0914Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0914Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
