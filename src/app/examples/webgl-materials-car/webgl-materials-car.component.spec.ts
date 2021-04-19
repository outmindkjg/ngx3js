import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCarComponent } from './webgl-materials-car.component';

describe('WebglMaterialsCarComponent', () => {
  let component: WebglMaterialsCarComponent;
  let fixture: ComponentFixture<WebglMaterialsCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
