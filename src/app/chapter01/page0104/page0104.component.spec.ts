import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0104Component } from './page0104.component';

describe('Page0104Component', () => {
  let component: Page0104Component;
  let fixture: ComponentFixture<Page0104Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0104Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0104Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
