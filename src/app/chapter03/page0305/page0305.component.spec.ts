import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0305Component } from './page0305.component';

describe('Page0305Component', () => {
  let component: Page0305Component;
  let fixture: ComponentFixture<Page0305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0305Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
