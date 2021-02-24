import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCameraArrayComponent } from './webgl-camera-array.component';

describe('WebglCameraArrayComponent', () => {
  let component: WebglCameraArrayComponent;
  let fixture: ComponentFixture<WebglCameraArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCameraArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCameraArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
