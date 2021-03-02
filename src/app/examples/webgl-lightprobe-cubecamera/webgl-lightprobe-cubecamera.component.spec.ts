import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightprobeCubecameraComponent } from './webgl-lightprobe-cubecamera.component';

describe('WebglLightprobeCubecameraComponent', () => {
  let component: WebglLightprobeCubecameraComponent;
  let fixture: ComponentFixture<WebglLightprobeCubecameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightprobeCubecameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightprobeCubecameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
