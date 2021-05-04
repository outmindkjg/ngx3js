import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscControlsPointerlockComponent } from './misc-controls-pointerlock.component';

describe('MiscControlsPointerlockComponent', () => {
  let component: MiscControlsPointerlockComponent;
  let fixture: ComponentFixture<MiscControlsPointerlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscControlsPointerlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscControlsPointerlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
