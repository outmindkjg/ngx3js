import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0706Component } from './page0706.component';

describe('Page0706Component', () => {
  let component: Page0706Component;
  let fixture: ComponentFixture<Page0706Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0706Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0706Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
