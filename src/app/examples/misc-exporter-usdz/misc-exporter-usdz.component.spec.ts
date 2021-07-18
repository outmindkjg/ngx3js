import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscExporterUsdzComponent } from './misc-exporter-usdz.component';

describe('MiscExporterUsdzComponent', () => {
  let component: MiscExporterUsdzComponent;
  let fixture: ComponentFixture<MiscExporterUsdzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscExporterUsdzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscExporterUsdzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
