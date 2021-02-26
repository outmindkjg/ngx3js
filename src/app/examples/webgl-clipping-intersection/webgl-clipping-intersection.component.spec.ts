import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglClippingIntersectionComponent } from './webgl-clipping-intersection.component';

describe('WebglClippingIntersectionComponent', () => {
  let component: WebglClippingIntersectionComponent;
  let fixture: ComponentFixture<WebglClippingIntersectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglClippingIntersectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglClippingIntersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
