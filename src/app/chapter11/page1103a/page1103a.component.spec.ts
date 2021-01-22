import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1103aComponent } from './page1103a.component';

describe('Page1103aComponent', () => {
  let component: Page1103aComponent;
  let fixture: ComponentFixture<Page1103aComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1103aComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1103aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
