import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0902Component } from './page0902.component';

describe('Page0902Component', () => {
  let component: Page0902Component;
  let fixture: ComponentFixture<Page0902Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0902Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0902Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
