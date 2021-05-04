import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css2dLabelComponent } from './css2d-label.component';

describe('Css2dLabelComponent', () => {
  let component: Css2dLabelComponent;
  let fixture: ComponentFixture<Css2dLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css2dLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css2dLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
