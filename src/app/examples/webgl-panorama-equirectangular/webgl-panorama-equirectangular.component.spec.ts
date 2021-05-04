import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPanoramaEquirectangularComponent } from './webgl-panorama-equirectangular.component';

describe('WebglPanoramaEquirectangularComponent', () => {
  let component: WebglPanoramaEquirectangularComponent;
  let fixture: ComponentFixture<WebglPanoramaEquirectangularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPanoramaEquirectangularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPanoramaEquirectangularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
