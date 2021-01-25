import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0906Component } from './page0906.component';

describe('Page0906Component', () => {
  let component: Page0906Component;
  let fixture: ComponentFixture<Page0906Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0906Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0906Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
