import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightsPointlightsComponent } from './webgl-lights-pointlights.component';

describe('WebglLightsPointlightsComponent', () => {
  let component: WebglLightsPointlightsComponent;
  let fixture: ComponentFixture<WebglLightsPointlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightsPointlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightsPointlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
