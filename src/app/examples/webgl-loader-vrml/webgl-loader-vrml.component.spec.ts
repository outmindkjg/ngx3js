import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderVrmlComponent } from './webgl-loader-vrml.component';

describe('WebglLoaderVrmlComponent', () => {
  let component: WebglLoaderVrmlComponent;
  let fixture: ComponentFixture<WebglLoaderVrmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderVrmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderVrmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
