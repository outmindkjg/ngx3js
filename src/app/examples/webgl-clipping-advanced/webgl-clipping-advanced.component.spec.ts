import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglClippingAdvancedComponent } from './webgl-clipping-advanced.component';

describe('WebglClippingAdvancedComponent', () => {
  let component: WebglClippingAdvancedComponent;
  let fixture: ComponentFixture<WebglClippingAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglClippingAdvancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglClippingAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
