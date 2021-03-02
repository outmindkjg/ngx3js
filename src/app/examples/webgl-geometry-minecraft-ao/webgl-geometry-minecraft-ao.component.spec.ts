import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryMinecraftAoComponent } from './webgl-geometry-minecraft-ao.component';

describe('WebglGeometryMinecraftAoComponent', () => {
  let component: WebglGeometryMinecraftAoComponent;
  let fixture: ComponentFixture<WebglGeometryMinecraftAoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryMinecraftAoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryMinecraftAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
