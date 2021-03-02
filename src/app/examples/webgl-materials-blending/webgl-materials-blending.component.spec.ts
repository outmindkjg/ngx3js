import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsBlendingComponent } from './webgl-materials-blending.component';

describe('WebglMaterialsBlendingComponent', () => {
  let component: WebglMaterialsBlendingComponent;
  let fixture: ComponentFixture<WebglMaterialsBlendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsBlendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsBlendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
