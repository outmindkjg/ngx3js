import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2VolumeInstancingComponent } from './webgl2-volume-instancing.component';

describe('Webgl2VolumeInstancingComponent', () => {
  let component: Webgl2VolumeInstancingComponent;
  let fixture: ComponentFixture<Webgl2VolumeInstancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2VolumeInstancingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2VolumeInstancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
