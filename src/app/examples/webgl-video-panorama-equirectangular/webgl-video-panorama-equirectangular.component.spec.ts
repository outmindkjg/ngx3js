import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglVideoPanoramaEquirectangularComponent } from './webgl-video-panorama-equirectangular.component';

describe('WebglVideoPanoramaEquirectangularComponent', () => {
  let component: WebglVideoPanoramaEquirectangularComponent;
  let fixture: ComponentFixture<WebglVideoPanoramaEquirectangularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglVideoPanoramaEquirectangularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglVideoPanoramaEquirectangularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
