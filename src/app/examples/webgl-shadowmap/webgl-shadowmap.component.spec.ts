import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmapComponent } from './webgl-shadowmap.component';

describe('WebglShadowmapComponent', () => {
  let component: WebglShadowmapComponent;
  let fixture: ComponentFixture<WebglShadowmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
