import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0303Component } from './page0303.component';

describe('Page0303Component', () => {
  let component: Page0303Component;
  let fixture: ComponentFixture<Page0303Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0303Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0303Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
