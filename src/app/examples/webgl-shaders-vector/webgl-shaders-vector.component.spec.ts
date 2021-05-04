import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadersVectorComponent } from './webgl-shaders-vector.component';

describe('WebglShadersVectorComponent', () => {
  let component: WebglShadersVectorComponent;
  let fixture: ComponentFixture<WebglShadersVectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadersVectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadersVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
