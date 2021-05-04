import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgSandboxComponent } from './svg-sandbox.component';

describe('SvgSandboxComponent', () => {
  let component: SvgSandboxComponent;
  let fixture: ComponentFixture<SvgSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
