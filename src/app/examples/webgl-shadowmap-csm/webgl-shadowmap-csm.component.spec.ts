import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmapCsmComponent } from './webgl-shadowmap-csm.component';

describe('WebglShadowmapCsmComponent', () => {
  let component: WebglShadowmapCsmComponent;
  let fixture: ComponentFixture<WebglShadowmapCsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmapCsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmapCsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
