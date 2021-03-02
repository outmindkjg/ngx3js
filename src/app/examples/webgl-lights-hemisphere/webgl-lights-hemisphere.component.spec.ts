import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightsHemisphereComponent } from './webgl-lights-hemisphere.component';

describe('WebglLightsHemisphereComponent', () => {
  let component: WebglLightsHemisphereComponent;
  let fixture: ComponentFixture<WebglLightsHemisphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightsHemisphereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightsHemisphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
