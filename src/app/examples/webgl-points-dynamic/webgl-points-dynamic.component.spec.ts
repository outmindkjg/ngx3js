import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPointsDynamicComponent } from './webgl-points-dynamic.component';

describe('WebglPointsDynamicComponent', () => {
  let component: WebglPointsDynamicComponent;
  let fixture: ComponentFixture<WebglPointsDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPointsDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPointsDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
