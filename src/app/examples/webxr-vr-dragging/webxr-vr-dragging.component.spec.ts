import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrDraggingComponent } from './webxr-vr-dragging.component';

describe('WebxrVrDraggingComponent', () => {
  let component: WebxrVrDraggingComponent;
  let fixture: ComponentFixture<WebxrVrDraggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrDraggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrDraggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
