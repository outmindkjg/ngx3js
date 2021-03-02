import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightsSpotlightComponent } from './webgl-lights-spotlight.component';

describe('WebglLightsSpotlightComponent', () => {
  let component: WebglLightsSpotlightComponent;
  let fixture: ComponentFixture<WebglLightsSpotlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightsSpotlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightsSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
