import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscControlsTransformComponent } from './misc-controls-transform.component';

describe('MiscControlsTransformComponent', () => {
  let component: MiscControlsTransformComponent;
  let fixture: ComponentFixture<MiscControlsTransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscControlsTransformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscControlsTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
