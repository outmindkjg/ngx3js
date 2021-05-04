import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrHandinputCubesComponent } from './webxr-vr-handinput-cubes.component';

describe('WebxrVrHandinputCubesComponent', () => {
  let component: WebxrVrHandinputCubesComponent;
  let fixture: ComponentFixture<WebxrVrHandinputCubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrHandinputCubesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrHandinputCubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
