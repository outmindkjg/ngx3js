import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscBoxselectionComponent } from './misc-boxselection.component';

describe('MiscBoxselectionComponent', () => {
  let component: MiscBoxselectionComponent;
  let fixture: ComponentFixture<MiscBoxselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscBoxselectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscBoxselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
