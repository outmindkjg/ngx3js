import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderVtkComponent } from './webgl-loader-vtk.component';

describe('WebglLoaderVtkComponent', () => {
  let component: WebglLoaderVtkComponent;
  let fixture: ComponentFixture<WebglLoaderVtkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderVtkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderVtkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
