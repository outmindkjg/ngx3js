import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscControlsDeviceorientationComponent } from './misc-controls-deviceorientation.component';

describe('MiscControlsDeviceorientationComponent', () => {
  let component: MiscControlsDeviceorientationComponent;
  let fixture: ComponentFixture<MiscControlsDeviceorientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscControlsDeviceorientationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscControlsDeviceorientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
