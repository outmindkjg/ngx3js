import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGeometryComponent } from './ngx-geometry.component';

describe('NgxGeometryComponent', () => {
  let component: NgxGeometryComponent;
  let fixture: ComponentFixture<NgxGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxGeometryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
