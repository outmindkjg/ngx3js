import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderObjMtlComponent } from './webgl-loader-obj-mtl.component';

describe('WebglLoaderObjMtlComponent', () => {
  let component: WebglLoaderObjMtlComponent;
  let fixture: ComponentFixture<WebglLoaderObjMtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderObjMtlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderObjMtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
