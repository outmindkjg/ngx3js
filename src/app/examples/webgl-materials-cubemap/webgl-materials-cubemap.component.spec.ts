import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCubemapComponent } from './webgl-materials-cubemap.component';

describe('WebglMaterialsCubemapComponent', () => {
  let component: WebglMaterialsCubemapComponent;
  let fixture: ComponentFixture<WebglMaterialsCubemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCubemapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCubemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
