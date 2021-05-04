import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscControlsMapComponent } from './misc-controls-map.component';

describe('MiscControlsMapComponent', () => {
  let component: MiscControlsMapComponent;
  let fixture: ComponentFixture<MiscControlsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscControlsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscControlsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
