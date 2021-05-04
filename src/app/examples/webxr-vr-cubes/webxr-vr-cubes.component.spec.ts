import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrCubesComponent } from './webxr-vr-cubes.component';

describe('WebxrVrCubesComponent', () => {
  let component: WebxrVrCubesComponent;
  let fixture: ComponentFixture<WebxrVrCubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrCubesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrCubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
