import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsDisplacementmapComponent } from './webgl-materials-displacementmap.component';

describe('WebglMaterialsDisplacementmapComponent', () => {
  let component: WebglMaterialsDisplacementmapComponent;
  let fixture: ComponentFixture<WebglMaterialsDisplacementmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsDisplacementmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsDisplacementmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
