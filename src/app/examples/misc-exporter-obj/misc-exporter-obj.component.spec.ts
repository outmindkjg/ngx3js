import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscExporterObjComponent } from './misc-exporter-obj.component';

describe('MiscExporterObjComponent', () => {
  let component: MiscExporterObjComponent;
  let fixture: ComponentFixture<MiscExporterObjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscExporterObjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscExporterObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
