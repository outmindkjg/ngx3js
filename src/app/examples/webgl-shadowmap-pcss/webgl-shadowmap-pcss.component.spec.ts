import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmapPcssComponent } from './webgl-shadowmap-pcss.component';

describe('WebglShadowmapPcssComponent', () => {
  let component: WebglShadowmapPcssComponent;
  let fixture: ComponentFixture<WebglShadowmapPcssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmapPcssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmapPcssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
