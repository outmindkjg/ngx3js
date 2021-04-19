import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsNormalmapComponent } from './webgl-materials-normalmap.component';

describe('WebglMaterialsNormalmapComponent', () => {
  let component: WebglMaterialsNormalmapComponent;
  let fixture: ComponentFixture<WebglMaterialsNormalmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsNormalmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsNormalmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
