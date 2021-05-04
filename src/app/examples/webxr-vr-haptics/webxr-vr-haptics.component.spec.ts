import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrHapticsComponent } from './webxr-vr-haptics.component';

describe('WebxrVrHapticsComponent', () => {
  let component: WebxrVrHapticsComponent;
  let fixture: ComponentFixture<WebxrVrHapticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrHapticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrHapticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
