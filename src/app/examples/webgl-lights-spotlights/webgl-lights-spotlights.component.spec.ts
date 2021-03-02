import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightsSpotlightsComponent } from './webgl-lights-spotlights.component';

describe('WebglLightsSpotlightsComponent', () => {
  let component: WebglLightsSpotlightsComponent;
  let fixture: ComponentFixture<WebglLightsSpotlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightsSpotlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightsSpotlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
