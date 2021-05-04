import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrRollercoasterComponent } from './webxr-vr-rollercoaster.component';

describe('WebxrVrRollercoasterComponent', () => {
  let component: WebxrVrRollercoasterComponent;
  let fixture: ComponentFixture<WebxrVrRollercoasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrRollercoasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrRollercoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
