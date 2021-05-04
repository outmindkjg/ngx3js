import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryCustomAttributesParticlesComponent } from './webgl-buffergeometry-custom-attributes-particles.component';

describe('WebglBuffergeometryCustomAttributesParticlesComponent', () => {
  let component: WebglBuffergeometryCustomAttributesParticlesComponent;
  let fixture: ComponentFixture<WebglBuffergeometryCustomAttributesParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryCustomAttributesParticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryCustomAttributesParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
