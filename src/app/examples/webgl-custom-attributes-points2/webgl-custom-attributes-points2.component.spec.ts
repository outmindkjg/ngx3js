import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCustomAttributesPoints2Component } from './webgl-custom-attributes-points2.component';

describe('WebglCustomAttributesPoints2Component', () => {
  let component: WebglCustomAttributesPoints2Component;
  let fixture: ComponentFixture<WebglCustomAttributesPoints2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCustomAttributesPoints2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCustomAttributesPoints2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
