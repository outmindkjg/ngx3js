import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0808Component } from './page0808.component';

describe('Page0808Component', () => {
  let component: Page0808Component;
  let fixture: ComponentFixture<Page0808Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0808Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0808Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
