import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscLookatComponent } from './misc-lookat.component';

describe('MiscLookatComponent', () => {
  let component: MiscLookatComponent;
  let fixture: ComponentFixture<MiscLookatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscLookatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscLookatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
