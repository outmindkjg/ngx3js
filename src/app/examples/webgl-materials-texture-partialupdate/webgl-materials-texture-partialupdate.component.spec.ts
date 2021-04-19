import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsTexturePartialupdateComponent } from './webgl-materials-texture-partialupdate.component';

describe('WebglMaterialsTexturePartialupdateComponent', () => {
  let component: WebglMaterialsTexturePartialupdateComponent;
  let fixture: ComponentFixture<WebglMaterialsTexturePartialupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsTexturePartialupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsTexturePartialupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
