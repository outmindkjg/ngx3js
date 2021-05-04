import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscControlsFlyComponent } from './misc-controls-fly.component';

describe('MiscControlsFlyComponent', () => {
  let component: MiscControlsFlyComponent;
  let fixture: ComponentFixture<MiscControlsFlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscControlsFlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscControlsFlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
