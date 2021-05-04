import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscUvTestsComponent } from './misc-uv-tests.component';

describe('MiscUvTestsComponent', () => {
  let component: MiscUvTestsComponent;
  let fixture: ComponentFixture<MiscUvTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscUvTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscUvTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
