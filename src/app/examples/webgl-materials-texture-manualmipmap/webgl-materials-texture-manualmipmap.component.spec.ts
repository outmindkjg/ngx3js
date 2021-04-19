import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsTextureManualmipmapComponent } from './webgl-materials-texture-manualmipmap.component';

describe('WebglMaterialsTextureManualmipmapComponent', () => {
  let component: WebglMaterialsTextureManualmipmapComponent;
  let fixture: ComponentFixture<WebglMaterialsTextureManualmipmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsTextureManualmipmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsTextureManualmipmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
