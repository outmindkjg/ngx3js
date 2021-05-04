import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2VolumePerlinComponent } from './webgl2-volume-perlin.component';

describe('Webgl2VolumePerlinComponent', () => {
  let component: Webgl2VolumePerlinComponent;
  let fixture: ComponentFixture<Webgl2VolumePerlinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2VolumePerlinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2VolumePerlinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
