import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0809Component } from './page0809.component';

describe('Page0809Component', () => {
  let component: Page0809Component;
  let fixture: ComponentFixture<Page0809Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0809Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0809Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
