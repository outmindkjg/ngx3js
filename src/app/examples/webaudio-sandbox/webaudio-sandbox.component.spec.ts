import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebaudioSandboxComponent } from './webaudio-sandbox.component';

describe('WebaudioSandboxComponent', () => {
  let component: WebaudioSandboxComponent;
  let fixture: ComponentFixture<WebaudioSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebaudioSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebaudioSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
