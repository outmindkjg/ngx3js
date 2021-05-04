import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPanoramaCubeComponent } from './webgl-panorama-cube.component';

describe('WebglPanoramaCubeComponent', () => {
  let component: WebglPanoramaCubeComponent;
  let fixture: ComponentFixture<WebglPanoramaCubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPanoramaCubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPanoramaCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
