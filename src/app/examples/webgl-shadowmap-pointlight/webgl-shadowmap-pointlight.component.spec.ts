import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmapPointlightComponent } from './webgl-shadowmap-pointlight.component';

describe('WebglShadowmapPointlightComponent', () => {
  let component: WebglShadowmapPointlightComponent;
  let fixture: ComponentFixture<WebglShadowmapPointlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmapPointlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmapPointlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
