import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscControlsDragComponent } from './misc-controls-drag.component';

describe('MiscControlsDragComponent', () => {
  let component: MiscControlsDragComponent;
  let fixture: ComponentFixture<MiscControlsDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscControlsDragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscControlsDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
