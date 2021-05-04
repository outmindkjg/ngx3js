import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscControlsOrbitComponent } from './misc-controls-orbit.component';

describe('MiscControlsOrbitComponent', () => {
  let component: MiscControlsOrbitComponent;
  let fixture: ComponentFixture<MiscControlsOrbitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscControlsOrbitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscControlsOrbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
