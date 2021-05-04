import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscControlsTrackballComponent } from './misc-controls-trackball.component';

describe('MiscControlsTrackballComponent', () => {
  let component: MiscControlsTrackballComponent;
  let fixture: ComponentFixture<MiscControlsTrackballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscControlsTrackballComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscControlsTrackballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
