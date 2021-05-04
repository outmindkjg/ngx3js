import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadersTonemappingComponent } from './webgl-shaders-tonemapping.component';

describe('WebglShadersTonemappingComponent', () => {
  let component: WebglShadersTonemappingComponent;
  let fixture: ComponentFixture<WebglShadersTonemappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadersTonemappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadersTonemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
