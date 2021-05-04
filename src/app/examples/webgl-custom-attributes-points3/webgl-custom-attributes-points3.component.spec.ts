import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCustomAttributesPoints3Component } from './webgl-custom-attributes-points3.component';

describe('WebglCustomAttributesPoints3Component', () => {
  let component: WebglCustomAttributesPoints3Component;
  let fixture: ComponentFixture<WebglCustomAttributesPoints3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCustomAttributesPoints3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCustomAttributesPoints3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
