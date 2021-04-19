import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsNormalmapObjectSpaceComponent } from './webgl-materials-normalmap-object-space.component';

describe('WebglMaterialsNormalmapObjectSpaceComponent', () => {
  let component: WebglMaterialsNormalmapObjectSpaceComponent;
  let fixture: ComponentFixture<WebglMaterialsNormalmapObjectSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsNormalmapObjectSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsNormalmapObjectSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
