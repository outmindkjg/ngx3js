import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglClippingStencilComponent } from './webgl-clipping-stencil.component';

describe('WebglClippingStencilComponent', () => {
  let component: WebglClippingStencilComponent;
  let fixture: ComponentFixture<WebglClippingStencilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglClippingStencilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglClippingStencilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
