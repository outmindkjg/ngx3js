import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0602Component } from './page0602.component';

describe('Page0602Component', () => {
  let component: Page0602Component;
  let fixture: ComponentFixture<Page0602Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0602Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0602Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
