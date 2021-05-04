import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrSandboxComponent } from './webxr-vr-sandbox.component';

describe('WebxrVrSandboxComponent', () => {
  let component: WebxrVrSandboxComponent;
  let fixture: ComponentFixture<WebxrVrSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
