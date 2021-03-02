import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderStlComponent } from './webgl-loader-stl.component';

describe('WebglLoaderStlComponent', () => {
  let component: WebglLoaderStlComponent;
  let fixture: ComponentFixture<WebglLoaderStlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderStlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderStlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
