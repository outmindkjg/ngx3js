import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderNrrdComponent } from './webgl-loader-nrrd.component';

describe('WebglLoaderNrrdComponent', () => {
  let component: WebglLoaderNrrdComponent;
  let fixture: ComponentFixture<WebglLoaderNrrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderNrrdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderNrrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
