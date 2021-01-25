import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0908Component } from './page0908.component';

describe('Page0908Component', () => {
  let component: Page0908Component;
  let fixture: ComponentFixture<Page0908Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0908Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0908Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
