import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1206Component } from './page1206.component';

describe('Page1206Component', () => {
  let component: Page1206Component;
  let fixture: ComponentFixture<Page1206Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1206Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1206Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
