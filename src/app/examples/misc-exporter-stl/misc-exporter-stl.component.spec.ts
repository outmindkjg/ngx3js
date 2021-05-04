import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscExporterStlComponent } from './misc-exporter-stl.component';

describe('MiscExporterStlComponent', () => {
  let component: MiscExporterStlComponent;
  let fixture: ComponentFixture<MiscExporterStlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscExporterStlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscExporterStlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
