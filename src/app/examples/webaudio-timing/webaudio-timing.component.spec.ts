import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebaudioTimingComponent } from './webaudio-timing.component';

describe('WebaudioTimingComponent', () => {
  let component: WebaudioTimingComponent;
  let fixture: ComponentFixture<WebaudioTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebaudioTimingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebaudioTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
