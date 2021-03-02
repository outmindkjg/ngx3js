import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometriesComponent } from './webgl-geometries.component';

describe('WebglGeometriesComponent', () => {
  let component: WebglGeometriesComponent;
  let fixture: ComponentFixture<WebglGeometriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
