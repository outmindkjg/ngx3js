import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscExporterColladaComponent } from './misc-exporter-collada.component';

describe('MiscExporterColladaComponent', () => {
  let component: MiscExporterColladaComponent;
  let fixture: ComponentFixture<MiscExporterColladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscExporterColladaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscExporterColladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
