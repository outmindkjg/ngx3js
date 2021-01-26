import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamerapassComponent } from './camerapass.component';

describe('CamerapassComponent', () => {
  let component: CamerapassComponent;
  let fixture: ComponentFixture<CamerapassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamerapassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamerapassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
