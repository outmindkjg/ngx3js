import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1103bComponent } from './page1103b.component';

describe('Page1103bComponent', () => {
  let component: Page1103bComponent;
  let fixture: ComponentFixture<Page1103bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1103bComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1103bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
