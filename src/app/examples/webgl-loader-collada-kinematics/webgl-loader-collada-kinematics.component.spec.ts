import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderColladaKinematicsComponent } from './webgl-loader-collada-kinematics.component';

describe('WebglLoaderColladaKinematicsComponent', () => {
  let component: WebglLoaderColladaKinematicsComponent;
  let fixture: ComponentFixture<WebglLoaderColladaKinematicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderColladaKinematicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderColladaKinematicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
