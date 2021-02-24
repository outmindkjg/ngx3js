import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0916Component } from './page0916.component';

describe('Page0916Component', () => {
  let component: Page0916Component;
  let fixture: ComponentFixture<Page0916Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0916Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0916Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
