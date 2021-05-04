import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmapViewerComponent } from './webgl-shadowmap-viewer.component';

describe('WebglShadowmapViewerComponent', () => {
  let component: WebglShadowmapViewerComponent;
  let fixture: ComponentFixture<WebglShadowmapViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmapViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmapViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
