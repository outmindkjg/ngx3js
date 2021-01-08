import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0409Component } from './page0409.component';

describe('Page0409Component', () => {
  let component: Page0409Component;
  let fixture: ComponentFixture<Page0409Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0409Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0409Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
