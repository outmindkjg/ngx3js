import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebaudioOrientationComponent } from './webaudio-orientation.component';

describe('WebaudioOrientationComponent', () => {
  let component: WebaudioOrientationComponent;
  let fixture: ComponentFixture<WebaudioOrientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebaudioOrientationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebaudioOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
