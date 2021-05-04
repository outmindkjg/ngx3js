import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dSandboxComponent } from './css3d-sandbox.component';

describe('Css3dSandboxComponent', () => {
  let component: Css3dSandboxComponent;
  let fixture: ComponentFixture<Css3dSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css3dSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
