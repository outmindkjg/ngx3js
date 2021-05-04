import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrBallshooterComponent } from './webxr-vr-ballshooter.component';

describe('WebxrVrBallshooterComponent', () => {
  let component: WebxrVrBallshooterComponent;
  let fixture: ComponentFixture<WebxrVrBallshooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrBallshooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrBallshooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
