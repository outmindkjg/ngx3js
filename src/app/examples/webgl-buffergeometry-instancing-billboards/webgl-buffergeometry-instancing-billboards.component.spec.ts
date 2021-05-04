import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglBuffergeometryInstancingBillboardsComponent } from './webgl-buffergeometry-instancing-billboards.component';

describe('WebglBuffergeometryInstancingBillboardsComponent', () => {
  let component: WebglBuffergeometryInstancingBillboardsComponent;
  let fixture: ComponentFixture<WebglBuffergeometryInstancingBillboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglBuffergeometryInstancingBillboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglBuffergeometryInstancingBillboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
