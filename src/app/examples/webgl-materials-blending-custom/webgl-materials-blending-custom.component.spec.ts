import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsBlendingCustomComponent } from './webgl-materials-blending-custom.component';

describe('WebglMaterialsBlendingCustomComponent', () => {
  let component: WebglMaterialsBlendingCustomComponent;
  let fixture: ComponentFixture<WebglMaterialsBlendingCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsBlendingCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsBlendingCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
