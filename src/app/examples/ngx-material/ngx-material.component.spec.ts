import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMaterialComponent } from './ngx-material.component';

describe('NgxMaterialComponent', () => {
  let component: NgxMaterialComponent;
  let fixture: ComponentFixture<NgxMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
