import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0913Component } from './page0913.component';

describe('Page0913Component', () => {
  let component: Page0913Component;
  let fixture: ComponentFixture<Page0913Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0913Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0913Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
