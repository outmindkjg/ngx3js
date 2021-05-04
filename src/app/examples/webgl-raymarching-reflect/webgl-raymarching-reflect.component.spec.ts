import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglRaymarchingReflectComponent } from './webgl-raymarching-reflect.component';

describe('WebglRaymarchingReflectComponent', () => {
  let component: WebglRaymarchingReflectComponent;
  let fixture: ComponentFixture<WebglRaymarchingReflectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglRaymarchingReflectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglRaymarchingReflectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
