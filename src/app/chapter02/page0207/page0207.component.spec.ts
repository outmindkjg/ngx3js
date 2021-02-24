import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0207Component } from './page0207.component';

describe('Page0207Component', () => {
  let component: Page0207Component;
  let fixture: ComponentFixture<Page0207Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0207Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0207Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
