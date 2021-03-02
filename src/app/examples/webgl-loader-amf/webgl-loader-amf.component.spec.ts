import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderAmfComponent } from './webgl-loader-amf.component';

describe('WebglLoaderAmfComponent', () => {
  let component: WebglLoaderAmfComponent;
  let fixture: ComponentFixture<WebglLoaderAmfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderAmfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderAmfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
