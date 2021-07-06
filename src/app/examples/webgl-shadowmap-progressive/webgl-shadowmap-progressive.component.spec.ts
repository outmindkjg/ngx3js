import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmapProgressiveComponent } from './webgl-shadowmap-progressive.component';

describe('WebglShadowmapProgressiveComponent', () => {
  let component: WebglShadowmapProgressiveComponent;
  let fixture: ComponentFixture<WebglShadowmapProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmapProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmapProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
