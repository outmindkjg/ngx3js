import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0208Component } from './page0208.component';

describe('Page0208Component', () => {
  let component: Page0208Component;
  let fixture: ComponentFixture<Page0208Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0208Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0208Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
