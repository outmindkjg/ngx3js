import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0705bComponent } from './page0705b.component';

describe('Page0705bComponent', () => {
  let component: Page0705bComponent;
  let fixture: ComponentFixture<Page0705bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0705bComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0705bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
