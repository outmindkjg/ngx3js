import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglClippingComponent } from './webgl-clipping.component';

describe('WebglClippingComponent', () => {
  let component: WebglClippingComponent;
  let fixture: ComponentFixture<WebglClippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglClippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglClippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
