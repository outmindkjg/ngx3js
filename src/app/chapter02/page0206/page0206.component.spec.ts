import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0206Component } from './page0206.component';

describe('Page0206Component', () => {
  let component: Page0206Component;
  let fixture: ComponentFixture<Page0206Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0206Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0206Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
