import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrHandinputComponent } from './webxr-vr-handinput.component';

describe('WebxrVrHandinputComponent', () => {
  let component: WebxrVrHandinputComponent;
  let fixture: ComponentFixture<WebxrVrHandinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrHandinputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrHandinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
