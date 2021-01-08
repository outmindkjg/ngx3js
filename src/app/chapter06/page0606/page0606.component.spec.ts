import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0606Component } from './page0606.component';

describe('Page0606Component', () => {
  let component: Page0606Component;
  let fixture: ComponentFixture<Page0606Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0606Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0606Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
