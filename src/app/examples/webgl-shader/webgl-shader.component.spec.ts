import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShaderComponent } from './webgl-shader.component';

describe('WebglShaderComponent', () => {
  let component: WebglShaderComponent;
  let fixture: ComponentFixture<WebglShaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
