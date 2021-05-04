import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadingPhysicalComponent } from './webgl-shading-physical.component';

describe('WebglShadingPhysicalComponent', () => {
  let component: WebglShadingPhysicalComponent;
  let fixture: ComponentFixture<WebglShadingPhysicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadingPhysicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadingPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
