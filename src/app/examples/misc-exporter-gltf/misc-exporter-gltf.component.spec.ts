import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscExporterGltfComponent } from './misc-exporter-gltf.component';

describe('MiscExporterGltfComponent', () => {
  let component: MiscExporterGltfComponent;
  let fixture: ComponentFixture<MiscExporterGltfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscExporterGltfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscExporterGltfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
