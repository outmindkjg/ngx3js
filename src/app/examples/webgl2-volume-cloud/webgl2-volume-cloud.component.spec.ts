import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2VolumeCloudComponent } from './webgl2-volume-cloud.component';

describe('Webgl2VolumeCloudComponent', () => {
  let component: Webgl2VolumeCloudComponent;
  let fixture: ComponentFixture<Webgl2VolumeCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2VolumeCloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2VolumeCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
