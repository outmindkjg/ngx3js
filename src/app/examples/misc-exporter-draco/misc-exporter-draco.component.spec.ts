import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscExporterDracoComponent } from './misc-exporter-draco.component';

describe('MiscExporterDracoComponent', () => {
  let component: MiscExporterDracoComponent;
  let fixture: ComponentFixture<MiscExporterDracoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscExporterDracoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscExporterDracoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
