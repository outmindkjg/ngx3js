import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadersSkyComponent } from './webgl-shaders-sky.component';

describe('WebglShadersSkyComponent', () => {
  let component: WebglShadersSkyComponent;
  let fixture: ComponentFixture<WebglShadersSkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadersSkyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadersSkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
