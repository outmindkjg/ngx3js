import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglSandboxComponent } from './webgl-sandbox.component';

describe('WebglSandboxComponent', () => {
  let component: WebglSandboxComponent;
  let fixture: ComponentFixture<WebglSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
