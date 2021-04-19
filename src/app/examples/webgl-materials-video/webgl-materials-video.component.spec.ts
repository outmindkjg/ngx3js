import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsVideoComponent } from './webgl-materials-video.component';

describe('WebglMaterialsVideoComponent', () => {
  let component: WebglMaterialsVideoComponent;
  let fixture: ComponentFixture<WebglMaterialsVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
