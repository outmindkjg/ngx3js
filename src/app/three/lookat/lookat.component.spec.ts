import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookatComponent } from './lookat.component';

describe('LookatComponent', () => {
  let component: LookatComponent;
  let fixture: ComponentFixture<LookatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
