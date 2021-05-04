import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmapVsmComponent } from './webgl-shadowmap-vsm.component';

describe('WebglShadowmapVsmComponent', () => {
  let component: WebglShadowmapVsmComponent;
  let fixture: ComponentFixture<WebglShadowmapVsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmapVsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmapVsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
