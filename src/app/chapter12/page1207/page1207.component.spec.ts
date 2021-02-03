import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1207Component } from './page1207.component';

describe('Page1207Component', () => {
  let component: Page1207Component;
  let fixture: ComponentFixture<Page1207Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1207Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1207Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
