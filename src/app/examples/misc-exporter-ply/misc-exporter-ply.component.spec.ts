import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscExporterPlyComponent } from './misc-exporter-ply.component';

describe('MiscExporterPlyComponent', () => {
  let component: MiscExporterPlyComponent;
  let fixture: ComponentFixture<MiscExporterPlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscExporterPlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscExporterPlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
