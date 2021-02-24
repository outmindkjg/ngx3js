import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0401Component } from './page0401.component';

describe('Page0401Component', () => {
  let component: Page0401Component;
  let fixture: ComponentFixture<Page0401Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0401Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
