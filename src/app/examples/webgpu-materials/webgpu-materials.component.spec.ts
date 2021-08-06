import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebgpuMaterialsComponent } from './webgpu-materials.component';

describe('WebgpuMaterialsComponent', () => {
  let component: WebgpuMaterialsComponent;
  let fixture: ComponentFixture<WebgpuMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebgpuMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebgpuMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
