import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0705aComponent } from './page0705a.component';

describe('Page0705aComponent', () => {
  let component: Page0705aComponent;
  let fixture: ComponentFixture<Page0705aComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page0705aComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0705aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
