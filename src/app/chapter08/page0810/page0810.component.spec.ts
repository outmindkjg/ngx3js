import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0810Component } from './page0810.component';

describe('Page0810Component', () => {
  let component: Page0810Component;
  let fixture: ComponentFixture<Page0810Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0810Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0810Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
