import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryMinecraftComponent } from './webgl-geometry-minecraft.component';

describe('WebglGeometryMinecraftComponent', () => {
  let component: WebglGeometryMinecraftComponent;
  let fixture: ComponentFixture<WebglGeometryMinecraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryMinecraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryMinecraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
